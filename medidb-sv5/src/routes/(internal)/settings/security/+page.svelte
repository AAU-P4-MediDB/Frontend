<script lang="ts">
  import type { RegisteredKey } from "./+page.server.ts";

  let { data } = $props();

  let keys = $state<RegisteredKey[]>(data.yubikeys ?? []);

  // Registration state
  let registerInput = $state("");
  let registerLabel = $state("");
  let registerError = $state("");
  let registerSuccess = $state("");
  let registering = $state(false);
  let showRegisterForm = $state(false);

  // Delete state
  let deletingUuid = $state<string | null>(null);

  function onYubikeyInput(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    registerError = "";
    registerSuccess = "";
    if (val.length >= 44) {
      registerInput = val.slice(0, 44);
      registerKey();
    }
  }

  async function registerKey() {
    if (registering) return;
    registerError = "";
    registerSuccess = "";
    registering = true;

    try {
      const res = await fetch("/api/mfa/yubikey", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ otp: registerInput, label: registerLabel.trim() || null }),
      });

      const data = await res.json();

      if (res.ok) {
        registerSuccess = "YubiKey registered successfully.";
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
      const res = await fetch(`/api/mfa/yubikey/${uuid}`, { method: "DELETE" });
      if (res.ok) {
        keys = keys.filter((k) => k.uuid !== uuid);
      }
    } finally {
      deletingUuid = null;
    }
  }

  async function refreshKeys() {
    try {
      const res = await fetch("/api/mfa/yubikey");
      if (res.ok) keys = await res.json();
    } catch {
      // silently ignore
    }
  }
</script>

<div class="max-w-2xl space-y-6">
  <div>
    <h2 class="text-xl font-semibold text-gray-800">Security</h2>
    <p class="text-sm text-gray-500 mt-1">Manage your two-factor authentication methods.</p>
  </div>

  <!-- YubiKey section -->
  <div class="bg-light rounded-xl p-6 shadow-sm">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h3 class="font-semibold text-gray-700">YubiKey</h3>
        <p class="text-xs text-gray-400 mt-0.5">Hardware security keys for two-factor login.</p>
      </div>
      <button
        class="text-sm font-medium px-4 py-2 rounded-lg bg-darker text-white hover:bg-dark transition-colors"
        onclick={() => { showRegisterForm = !showRegisterForm; registerError = ""; registerSuccess = ""; registerInput = ""; }}
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

        {#if registering}
          <p class="text-sm text-gray-400">Verifying…</p>
        {/if}
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
