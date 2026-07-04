<script lang="ts">
  import { onMount } from "svelte";
  import QRCode from "qrcode";
  import type { RegisteredKey, MfaStatus } from "./+page.server.ts";

  let { data } = $props();

  // ── YubiKey state ──────────────────────────────────────────────
  let keys = $state<RegisteredKey[]>(data.yubikeys ?? []);
  let showRegisterForm = $state(false);
  let registerInput = $state("");
  let registerLabel = $state("");
  let registerError = $state("");
  let registerSuccess = $state("");
  let registering = $state(false);
  let deletingUuid = $state<string | null>(null);

  // ── TOTP state ─────────────────────────────────────────────────
  let totpEnabled = $state(data.mfaStatus.totpEnabled);
  let showTotpSetup = $state(false);
  let totpSecret = $state("");
  let totpUri = $state("");
  let totpQr = $state("");
  let totpCode = $state("");
  let totpError = $state("");
  let totpLoading = $state(false);
  let disablingTotp = $state(false);

  // ── YubiKey handlers ───────────────────────────────────────────
  function onYubikeyInput(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    registerError = "";
    if (val.length >= 44) {
      registerInput = val.slice(0, 44);
      registerKey();
    }
  }

  async function registerKey() {
    if (registering) return;
    registering = true;
    registerError = "";
    registerSuccess = "";

    try {
      const res = await fetch("/api/um/mfa/yubikey", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ otp: registerInput, label: registerLabel.trim() || null }),
      });
      const data = await res.json();

      if (res.ok) {
        registerSuccess = "YubiKey registered.";
        registerInput = "";
        registerLabel = "";
        showRegisterForm = false;
        await refreshKeys();
      } else {
        registerError = data.error ?? "Registration failed.";
        registerInput = "";
      }
    } catch {
      registerError = "Could not reach the server.";
      registerInput = "";
    } finally {
      registering = false;
    }
  }

  async function deleteKey(uuid: string) {
    deletingUuid = uuid;
    try {
      const res = await fetch(`/api/um/mfa/yubikey/${uuid}`, { method: "DELETE" });
      if (res.ok) keys = keys.filter((k) => k.uuid !== uuid);
    } finally {
      deletingUuid = null;
    }
  }

  async function refreshKeys() {
    try {
      const res = await fetch("/api/um/mfa/yubikey");
      if (res.ok) keys = await res.json();
    } catch {}
  }

  // ── TOTP handlers ──────────────────────────────────────────────
  async function startTotpSetup() {
    totpLoading = true;
    totpError = "";
    totpCode = "";

    try {
      const res = await fetch("/api/um/mfa/totp");
      if (!res.ok) { totpError = "Could not generate setup code."; return; }

      const data = await res.json();
      totpSecret = data.secret;
      totpUri = data.otpauthUri;
      totpQr = await QRCode.toDataURL(totpUri, { width: 200, margin: 1 });
      showTotpSetup = true;
    } catch {
      totpError = "Could not reach the server.";
    } finally {
      totpLoading = false;
    }
  }

  async function confirmTotp() {
    if (!totpCode.trim()) return;
    totpLoading = true;
    totpError = "";

    try {
      const res = await fetch("/api/um/mfa/totp/confirm", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ secret: totpSecret, code: totpCode.trim() }),
      });
      const data = await res.json();

      if (res.ok) {
        totpEnabled = true;
        showTotpSetup = false;
        totpSecret = "";
        totpUri = "";
        totpQr = "";
        totpCode = "";
      } else {
        totpError = data.error ?? "Invalid code.";
        totpCode = "";
      }
    } catch {
      totpError = "Could not reach the server.";
    } finally {
      totpLoading = false;
    }
  }

  async function disableTotp() {
    disablingTotp = true;
    try {
      const res = await fetch("/api/um/mfa/totp", { method: "DELETE" });
      if (res.ok) totpEnabled = false;
    } finally {
      disablingTotp = false;
    }
  }
</script>

<div class="max-w-2xl space-y-6">
  <div>
    <h2 class="text-xl font-semibold text-gray-800">Security</h2>
    <p class="text-sm text-gray-500 mt-1">Manage your two-factor authentication methods.</p>
  </div>

  <!-- ── Authenticator app (TOTP) ─────────────────────────────── -->
  <div class="bg-light rounded-xl p-6 shadow-sm">
    <div class="flex items-center justify-between mb-1">
      <div>
        <h3 class="font-semibold text-gray-700">Authenticator app</h3>
        <p class="text-xs text-gray-400 mt-0.5">Time-based one-time passwords via any TOTP app.</p>
      </div>

      {#if totpEnabled}
        <span class="text-xs font-medium px-2.5 py-1 rounded-full bg-green-100 text-green-700">Enabled</span>
      {:else}
        <span class="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-500">Not set up</span>
      {/if}
    </div>

    {#if totpEnabled}
      <div class="mt-4">
        <button
          onclick={disableTotp}
          disabled={disablingTotp}
          class="text-sm font-medium px-4 py-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40"
        >
          {disablingTotp ? "Disabling…" : "Disable"}
        </button>
      </div>
    {:else if showTotpSetup}
      <div class="mt-4 space-y-4">
        <p class="text-sm text-gray-600">
          Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.), then enter the 6-digit code to confirm.
        </p>

        {#if totpQr}
          <div class="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <img src={totpQr} alt="TOTP QR code" class="rounded-lg border border-gray-200" width="160" height="160" />
            <div>
              <p class="text-xs text-gray-400 mb-1">Or enter the secret manually:</p>
              <code class="text-xs font-mono bg-white border border-gray-200 rounded px-2 py-1 break-all select-all">
                {totpSecret}
              </code>
            </div>
          </div>
        {/if}

        <div class="flex gap-2 items-start">
          <div class="flex-1">
            <label for="totp-confirm" class="block text-xs font-medium text-gray-500 mb-1">Confirmation code</label>
            <input
              id="totp-confirm"
              type="text"
              inputmode="numeric"
              pattern="[0-9]*"
              maxlength="6"
              placeholder="000000"
              autocomplete="one-time-code"
              bind:value={totpCode}
              oninput={() => (totpError = "")}
              class="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan"
            />
            {#if totpError}
              <p class="text-xs text-red-500 mt-1">{totpError}</p>
            {/if}
          </div>
          <div class="flex gap-2 mt-5">
            <button
              onclick={confirmTotp}
              disabled={totpLoading || totpCode.length < 6}
              class="text-sm font-medium px-4 py-2 rounded-lg bg-darker text-white hover:bg-dark transition-colors disabled:opacity-40"
            >
              {totpLoading ? "Verifying…" : "Confirm"}
            </button>
            <button
              onclick={() => { showTotpSetup = false; totpError = ""; totpCode = ""; }}
              class="text-sm font-medium px-4 py-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    {:else}
      <div class="mt-4">
        <button
          onclick={startTotpSetup}
          disabled={totpLoading}
          class="text-sm font-medium px-4 py-2 rounded-lg bg-darker text-white hover:bg-dark transition-colors disabled:opacity-40"
        >
          {totpLoading ? "Loading…" : "Set up authenticator app"}
        </button>
        {#if totpError}
          <p class="text-xs text-red-500 mt-2">{totpError}</p>
        {/if}
      </div>
    {/if}
  </div>

  <!-- ── YubiKey ──────────────────────────────────────────────── -->
  <div class="bg-light rounded-xl p-6 shadow-sm">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h3 class="font-semibold text-gray-700">YubiKey</h3>
        <p class="text-xs text-gray-400 mt-0.5">Hardware security keys for two-factor login.</p>
      </div>
      <button
        onclick={() => { showRegisterForm = !showRegisterForm; registerError = ""; registerSuccess = ""; registerInput = ""; }}
        class="text-sm font-medium px-4 py-2 rounded-lg bg-darker text-white hover:bg-dark transition-colors"
      >
        {showRegisterForm ? "Cancel" : "Add key"}
      </button>
    </div>

    {#if registerSuccess}
      <div class="mb-4 px-4 py-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
        {registerSuccess}
      </div>
    {/if}

    {#if showRegisterForm}
      <div class="mb-5 p-4 rounded-lg border border-gray-200 bg-white space-y-3">
        <p class="text-sm text-gray-600">Insert your YubiKey and touch the button — the code fills automatically.</p>

        <div>
          <label for="yk-label" class="block text-xs font-medium text-gray-500 mb-1">Label (optional)</label>
          <input
            id="yk-label"
            type="text"
            placeholder="e.g. Work YubiKey"
            bind:value={registerLabel}
            class="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan"
          />
        </div>

        <div>
          <label for="yk-otp" class="block text-xs font-medium text-gray-500 mb-1">Touch your YubiKey</label>
          <input
            id="yk-otp"
            type="password"
            autocomplete="off"
            placeholder="Waiting for YubiKey…"
            bind:value={registerInput}
            oninput={onYubikeyInput}
            disabled={registering}
            class="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan disabled:opacity-50"
          />
        </div>

        {#if registerError}
          <p class="text-sm text-red-600">{registerError}</p>
        {/if}

        <button
          onclick={registerKey}
          disabled={registering || registerInput.length < 44}
          class="w-full text-sm font-medium px-4 py-2 rounded-lg bg-darker text-white hover:bg-dark transition-colors disabled:opacity-40"
        >
          {registering ? "Verifying…" : "Register key"}
        </button>
      </div>
    {/if}

    {#if keys.length === 0}
      <div class="flex items-center justify-center h-20 border-2 border-dashed border-gray-200 rounded-lg">
        <p class="text-sm text-gray-300 italic">No YubiKeys registered</p>
      </div>
    {:else}
      <ul class="space-y-2">
        {#each keys as key (key.uuid)}
          <li class="flex items-center justify-between px-4 py-3 rounded-lg bg-white border border-gray-100">
            <div>
              <p class="text-sm font-medium text-gray-700">{key.label ?? "YubiKey"}</p>
              <p class="text-xs text-gray-400 font-mono mt-0.5">{key.publicId}</p>
            </div>
            <button
              onclick={() => deleteKey(key.uuid)}
              disabled={deletingUuid === key.uuid}
              class="text-xs font-medium px-3 py-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40"
            >
              {deletingUuid === key.uuid ? "Removing…" : "Remove"}
            </button>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>
