<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  let mfaToken = $state("");
  let availableMethods = $state<string[]>(["totp"]);
  let activeMethod = $state<"totp" | "yubikey">("totp");

  let totpCode = $state("");
  let yubikeyCode = $state("");
  let codeError = $state(false);
  let errorMessage = $state("");
  let loading = $state(false);

  let totalSteps = $state(1);
  let currentStep = $state(1);

  onMount(() => {
    const token = sessionStorage.getItem("mfa_token");
    if (!token) {
      goto("/login");
      return;
    }
    mfaToken = token;

    try {
      const methods = JSON.parse(sessionStorage.getItem("mfa_methods") ?? "[]");
      if (Array.isArray(methods) && methods.length > 0) {
        availableMethods = methods;
        totalSteps = methods.length;
        if (methods.includes("totp")) activeMethod = "totp";
        else if (methods.includes("yubikey")) activeMethod = "yubikey";
      }
    } catch {
      // ignore parse errors
    }
  });

  async function submit() {
    codeError = false;
    errorMessage = "";

    const code = activeMethod === "totp" ? totpCode.trim() : yubikeyCode.trim();

    if (!code) {
      codeError = true;
      return;
    }

    loading = true;

    try {
      const result = await fetch("/api/auth/mfa", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ mfaToken, code }),
        cache: "no-store",
      });

      if (result.ok) {
        sessionStorage.removeItem("mfa_token");
        sessionStorage.removeItem("mfa_methods");
        window.location.href = "/home";
        return;
      }

      if (result.status === 202) {
        const data = await result.json();
        mfaToken = data.mfaToken;
        availableMethods = data.remainingMethods;
        currentStep += 1;
        totpCode = "";
        yubikeyCode = "";
        if (data.remainingMethods.includes("totp")) activeMethod = "totp";
        else activeMethod = "yubikey";
        loading = false;
        return;
      }

      errorMessage = "Invalid code. Please try again.";
      totpCode = "";
      yubikeyCode = "";
      loading = false;
      codeError = true;
    } catch (err) {
      console.error("MFA fetch error:", err);
      errorMessage = "Unable to connect to the authentication service.";
      loading = false;
    }
  }

  function onYubikeyInput(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    // YubiKey OTPs are 44 modhex characters — auto-submit on completion
    if (val.length >= 44) {
      yubikeyCode = val.slice(0, 44);
      submit();
    }
  }
</script>

<div class="scene">
  <div class="card">
    <div class="card-inner">
      <h3>Two-factor authentication</h3>
      <p class="subtitle">Verify your identity to continue.</p>

      {#if errorMessage}
        <div class="global-error">{errorMessage}</div>
      {/if}

      {#if totalSteps > 1}
        <div class="step-indicator">Step {currentStep} of {totalSteps}</div>
      {/if}

      {#if availableMethods.length > 1}
        <div class="tab-row">
          {#if availableMethods.includes("totp")}
            <button
              class="tab-btn"
              class:active={activeMethod === "totp"}
              onclick={() => { activeMethod = "totp"; codeError = false; errorMessage = ""; }}
              type="button"
            >
              Authenticator app
            </button>
          {/if}
          {#if availableMethods.includes("yubikey")}
            <button
              class="tab-btn"
              class:active={activeMethod === "yubikey"}
              onclick={() => { activeMethod = "yubikey"; codeError = false; errorMessage = ""; }}
              type="button"
            >
              YubiKey
            </button>
          {/if}
        </div>
      {/if}

      <form onsubmit={(e) => { e.preventDefault(); submit(); }}>
        {#if activeMethod === "totp"}
          <div class="field" class:has-error={codeError}>
            <label for="totp-code">6-digit code</label>
            <input
              id="totp-code"
              type="text"
              inputmode="numeric"
              pattern="[0-9]*"
              maxlength="6"
              placeholder="000000"
              autocomplete="one-time-code"
              bind:value={totpCode}
              oninput={() => (codeError = false)}
            />
            <span class="field-error">Please enter the 6-digit code from your authenticator app.</span>
          </div>
        {:else}
          <div class="field yubikey-field" class:has-error={codeError}>
            <label for="yubikey-code">Touch your YubiKey</label>
            <div class="yubikey-hint">Insert your YubiKey and press the button — the code will fill automatically.</div>
            <input
              id="yubikey-code"
              type="password"
              autocomplete="off"
              placeholder="Waiting for YubiKey…"
              bind:value={yubikeyCode}
              oninput={onYubikeyInput}
            />
            <span class="field-error">No YubiKey input detected.</span>
          </div>
        {/if}

        <button type="submit" class="login-btn" disabled={loading}>
          {loading ? "Verifying…" : "Verify"}
        </button>
      </form>

      <a href="/login" class="back-link">Back to login</a>
    </div>
  </div>
</div>

<style>
  .scene {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #9ed6e8;
    background-image:
      radial-gradient(circle at 18% 22%, rgba(120, 205, 220, 0.65), transparent 55%),
      radial-gradient(circle at 82% 28%, rgba(58, 130, 160, 0.55), transparent 52%),
      radial-gradient(circle at 50% 88%, rgba(150, 215, 230, 0.6), transparent 55%),
      linear-gradient(135deg, #d4eefb 0%, #9ed6e8 48%, #6fbcd2 100%);
    background-size: cover;
    background-position: center;
  }

  .card {
    width: 384px;
    border-radius: 16px;
    overflow: hidden;
    background-color: #9ed6e8;
    background-image:
      radial-gradient(circle at 18% 22%, rgba(120, 205, 220, 0.65), transparent 55%),
      radial-gradient(circle at 82% 28%, rgba(58, 130, 160, 0.55), transparent 52%),
      radial-gradient(circle at 50% 88%, rgba(150, 215, 230, 0.6), transparent 55%),
      linear-gradient(135deg, #d4eefb 0%, #9ed6e8 48%, #6fbcd2 100%);
    background-size: cover;
    background-position: center;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12);
  }

  .card-inner {
    padding: 2.5rem 2.25rem 2rem;
    background: rgba(240, 248, 252, 0.62);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2a7a90;
    margin-bottom: 0.4rem;
  }

  .subtitle {
    font-size: 13px;
    color: rgba(30, 100, 120, 0.6);
    margin-bottom: 1.5rem;
  }

  .global-error {
    margin-bottom: 1rem;
    padding: 10px;
    background: rgba(160, 40, 40, 0.1);
    border: 1px solid rgba(160, 40, 40, 0.2);
    border-radius: 8px;
    color: #8a3030;
    font-size: 13px;
    text-align: center;
  }

  .step-indicator {
    font-size: 12px;
    font-weight: 500;
    color: rgba(30, 100, 120, 0.5);
    margin-bottom: 1rem;
    text-align: center;
  }

  .tab-row {
    display: flex;
    gap: 6px;
    margin-bottom: 1.5rem;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 9px;
    padding: 4px;
  }

  .tab-btn {
    flex: 1;
    padding: 7px 10px;
    border: none;
    border-radius: 7px;
    font-size: 12.5px;
    font-weight: 500;
    cursor: pointer;
    color: rgba(30, 100, 120, 0.6);
    background: transparent;
    transition: background 0.15s, color 0.15s;
  }

  .tab-btn.active {
    background: rgba(255, 255, 255, 0.75);
    color: #2a7a90;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  }

  .field {
    margin-bottom: 1.25rem;
  }

  .field label {
    display: block;
    font-size: 13px;
    font-weight: 500;
    color: rgba(30, 100, 120, 0.5);
    margin-bottom: 6px;
  }

  .field input {
    width: 100%;
    padding: 10px 14px;
    font-size: 14px;
    border-radius: 8px;
    border: 1px solid rgba(30, 100, 120, 0.18);
    background: rgba(255, 255, 255, 0.55);
    backdrop-filter: blur(8px);
    color: #1e5060;
    outline: none;
    transition:
      border-color 0.15s,
      box-shadow 0.15s,
      background 0.15s;
    box-sizing: border-box;
  }

  .field input:focus {
    border-color: rgba(30, 100, 120, 0.45);
    box-shadow: 0 0 0 3px rgba(30, 100, 120, 0.08);
    background: rgba(255, 255, 255, 0.75);
  }

  .field input::placeholder {
    color: rgba(30, 100, 120, 0.3);
  }

  .yubikey-hint {
    font-size: 12px;
    color: rgba(30, 100, 120, 0.5);
    margin-bottom: 8px;
    line-height: 1.4;
  }

  .field-error {
    display: none;
    font-size: 12px;
    color: #8a6030;
    margin-top: 5px;
    padding: 4px 8px;
    background: rgba(200, 160, 80, 0.12);
    border-radius: 5px;
  }

  .field.has-error input {
    border-color: rgba(160, 100, 40, 0.4);
  }

  .field.has-error .field-error {
    display: block;
  }

  .login-btn {
    width: 100%;
    padding: 11px;
    background: #2a7a90;
    color: rgba(255, 255, 255, 0.92);
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    letter-spacing: 0.01em;
    transition:
      background 0.15s,
      opacity 0.15s,
      transform 0.1s;
  }

  .login-btn:hover:not(:disabled) {
    background: #226478;
  }

  .login-btn:active:not(:disabled) {
    transform: scale(0.99);
  }

  .login-btn:disabled {
    opacity: 0.6;
    cursor: default;
  }

  .back-link {
    display: block;
    text-align: center;
    margin-top: 1.25rem;
    font-size: 13px;
    color: rgba(30, 100, 120, 0.55);
    text-decoration: none;
    transition: color 0.15s;
  }

  .back-link:hover {
    color: #2a7a90;
  }
</style>
