<script lang="ts">
  import { goto } from "$app/navigation";

  let emailValue = "";
  let passwordValue = "";
  let rememberMe = false;
  let emailError = false;
  let passwordError = false;
  let loading = false;

  function handleLogin() {
    emailError = false;
    passwordError = false;

    if (!emailValue || !emailValue.includes("@")) emailError = true;
    if (!passwordValue) passwordError = true;

    if (!emailError && !passwordError) {
      loading = true;
      goto("/home");
    }
  }
</script>

<div class="scene">
  <div class="card">
    <div class="card-inner">
      <h3>Sign in to your MediDB account</h3>

      <div class="field" class:has-error={emailError}>
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="name@company.com"
          bind:value={emailValue}
          on:input={() => (emailError = false)}
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
          on:input={() => (passwordError = false)}
        />
        <span class="field-error">Password cannot be empty.</span>
      </div>

      <div class="remember-row">
        <input type="checkbox" id="remember" bind:checked={rememberMe} />
        <label for="remember">Remember me</label>
      </div>

      <button class="login-btn" disabled={loading} on:click={handleLogin}>
        {loading ? "Signing in…" : "Login"}
      </button>
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
    transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
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
    transition: background 0.15s, opacity 0.15s, transform 0.1s;
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