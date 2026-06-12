<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte"; // Import onMount to safely read localStorage

  // Use empty strings instead of null to prevent Reactivity/HTML type mismatches
  let emailValue = $state("");
  let passwordValue = $state("");

  let rememberMe = $state(true);
  let emailError = $state(false);
  let passwordError = $state(false);
  let loginErrorMessage = $state("");
  let loading = $state(false);

  // Read saved email from localStorage on component mount
  onMount(() => {
    const savedEmail = localStorage.getItem("remembered_email");
    if (savedEmail) {
      emailValue = savedEmail;
      rememberMe = true;
    }
  });

  async function handleLogin() {
    emailError = false;
    passwordError = false;
    loginErrorMessage = "";

    if (!emailValue || !emailValue.includes("@")) {
      emailError = true;
      return;
    }
    if (!passwordValue) {
      passwordError = true;
      return;
    }

    loading = true;

    try {
      const result = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: emailValue, password: passwordValue }),
      });

      if (result.ok) {
        console.log("Login ok, forcing full session reload...");

        if (rememberMe) localStorage.setItem("remembered_email", emailValue);

        // Wipe client-side cache and force a hard server request to /home
        window.location.href = "/home";
      } else {
        loginErrorMessage = "Invalid credentials";
        loading = false;
      }
    } catch (err) {
      console.error("Login fetch error:", err);
      loginErrorMessage = "Unable to connect to the login service.";
      loading = false;
    }
  }
</script>

<div class="scene">
  <div class="card">
    <div class="card-inner">
      <h3>Sign in to your MediDB account</h3>

      {#if loginErrorMessage}
        <div class="global-error">
          {loginErrorMessage}
        </div>
      {/if}

      <form
        onsubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <div class="field" class:has-error={emailError}>
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="name@company.com"
            bind:value={emailValue}
            oninput={() => (emailError = false)}
          />
          <span class="field-error">Please enter a valid email address.</span>
        </div>

        <div class="field" class:has-error={passwordError}>
          <label for="pass">Your password</label>
          <input
            id="pass"
            type="password"
            placeholder="••••••••"
            bind:value={passwordValue}
            oninput={() => (passwordError = false)}
          />
          <span class="field-error">Password cannot be empty.</span>
        </div>

        <div class="remember-row">
          <input type="checkbox" id="remember" bind:checked={rememberMe} />
          <label for="remember">Remember me</label>
        </div>

        <button type="submit" class="login-btn" disabled={loading}>
          {loading ? "Signing in…" : "Login"}
        </button>
      </form>
    </div>
  </div>
</div>

<style>
  /* ... keeping your existing styles ... */

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

  .scene {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .card {
    width: 384px;
    border-radius: 16px;
    overflow: hidden;
    background-image: url("https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba4484ec8c29");
    background-size: cover;
    background-position: center;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12);
  }

  .card-inner {
    padding: 2.5rem 2.25rem 2rem;
    background: rgba(240, 248, 252, 0.78);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2a7a90;
    margin-bottom: 1.75rem;
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
  }

  .field input:focus {
    border-color: rgba(30, 100, 120, 0.45);
    box-shadow: 0 0 0 3px rgba(30, 100, 120, 0.08);
    background: rgba(255, 255, 255, 0.75);
  }

  .field input::placeholder {
    color: rgba(30, 100, 120, 0.3);
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

  .remember-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 1.5rem;
  }

  .remember-row input[type="checkbox"] {
    width: 15px;
    height: 15px;
    accent-color: #2a7a90;
    cursor: pointer;
  }

  .remember-row label {
    font-size: 13px;
    color: rgba(30, 100, 120, 0.55);
    cursor: pointer;
    user-select: none;
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
</style>
