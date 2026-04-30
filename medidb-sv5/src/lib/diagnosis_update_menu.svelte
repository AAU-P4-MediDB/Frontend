<!-- POST /api/dpm/usrup/{uuid}/diagnosis -->

<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  interface Props {
    open?: boolean;
  }

  let { open = $bindable(false) }: Props = $props();

  let id        = $state('');
  let name      = $state('');
  let temporary = $state(false);

  const dispatch = createEventDispatcher<{
    submit: { id: string; name: string; temporary: boolean };
  }>();

  function close() { open = false; }

  function submit() {
    dispatch('submit', { id, name, temporary });
    close();
  }
</script>

{#if open}
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <div class="overlay" onclick={(e) => { if (e.target === e.currentTarget) close(); }}>
    <div class="card" role="dialog" aria-modal="true">
      <div class="card-header">
        <span class="card-tag">DIAGNOSIS</span>
        <button class="close-btn" onclick={close} aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <div class="card-body">
        <div class="row">
          <div class="field">
            <label for="c4-id">ID</label>
            <input id="c4-id" type="text" bind:value={id} placeholder="DGN-001…" />
          </div>
          <div class="field">
            <label for="c4-name">Name</label>
            <input id="c4-name" type="text" bind:value={name} placeholder="Diagnosis name…" />
          </div>
        </div>

        <div class="flag-row">
          <button
            class="flag-toggle"
            class:active={temporary}
            role="checkbox"
            aria-checked={temporary}
            onclick={() => (temporary = !temporary)}
            type="button"
          >
            <span class="checkbox" class:checked={temporary}>
              {#if temporary}
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              {/if}
            </span>
            <span class="flag-label">
              Temporary diagnosis
              {#if temporary}
                <span class="flag-badge">active</span>
              {/if}
            </span>
          </button>

          <p class="flag-hint">
            {#if temporary}
              This diagnosis is marked as <strong>temporary</strong> and may be automatically removed or archived.
            {:else}
              Mark as temporary if this diagnosis is not intended to be permanent.
            {/if}
          </p>
        </div>
      </div>

      <div class="card-footer">
        <button class="btn-ghost" onclick={close}>Cancel</button>
        <button class="btn-primary" class:warning={temporary} onclick={submit}>Submit</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .overlay {
    position: fixed; inset: 0;
    background: rgba(8,14,24,0.55);
    backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center;
    z-index: 9000;
    animation: fade-in 0.18s ease;
  }
  .card {
    background: #fff; border: 1px solid #e2e8f0;
    border-radius: 14px; width: min(440px, calc(100vw - 32px));
    box-shadow: 0 4px 6px -1px rgba(0,0,0,.07), 0 20px 60px -10px rgba(0,0,0,.18);
    animation: slide-up 0.22s cubic-bezier(0.34,1.4,0.64,1);
    overflow: hidden;
  }
  .card-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 20px 14px; border-bottom: 1px solid #f1f5f9;
  }
  .card-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px; font-weight: 700; letter-spacing: .12em;
    color: #d97706; background: #fffbeb;
    padding: 3px 8px; border-radius: 4px;
  }
  .close-btn {
    background: none; border: none; cursor: pointer; color: #94a3b8;
    padding: 4px; border-radius: 6px; display: flex; align-items: center;
    transition: color .15s, background .15s;
  }
  .close-btn:hover { color: #334155; background: #f1f5f9; }
  .card-body { padding: 20px; display: flex; flex-direction: column; gap: 20px; }
  .row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .field { display: flex; flex-direction: column; gap: 5px; }
  label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px; font-weight: 600; letter-spacing: .1em;
    text-transform: uppercase; color: #64748b;
  }
  input {
    font-family: 'DM Sans', sans-serif; font-size: 14px; color: #0f172a;
    background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 8px;
    padding: 9px 12px; outline: none; width: 100%; box-sizing: border-box;
    transition: border-color .15s, box-shadow .15s, background .15s;
  }
  input::placeholder { color: #94a3b8; }
  input:focus {
    border-color: #d97706; background: #fff;
    box-shadow: 0 0 0 3px rgba(217,119,6,.1);
  }
  .flag-row { display: flex; flex-direction: column; gap: 8px; }
  .flag-toggle {
    display: flex; align-items: center; gap: 10px;
    background: #f8fafc; border: 1.5px solid #e2e8f0;
    border-radius: 10px; padding: 12px 14px;
    cursor: pointer; text-align: left; width: 100%; font-family: inherit;
    transition: border-color .15s, background .15s;
  }
  .flag-toggle:hover { border-color: #cbd5e1; background: #fff; }
  .flag-toggle.active { border-color: #fbbf24; background: #fffbeb; }
  .checkbox {
    width: 18px; height: 18px; min-width: 18px;
    border-radius: 5px; border: 2px solid #cbd5e1;
    display: flex; align-items: center; justify-content: center;
    background: #fff; transition: border-color .15s, background .15s;
  }
  .checkbox.checked { background: #f59e0b; border-color: #f59e0b; }
  .flag-label {
    font-size: 14px; font-weight: 500; color: #334155;
    display: flex; align-items: center; gap: 8px;
  }
  .flag-badge {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px; font-weight: 700; letter-spacing: .08em;
    text-transform: uppercase; color: #92400e;
    background: #fde68a; padding: 2px 6px; border-radius: 4px;
  }
  .flag-hint { font-family: 'DM Sans', sans-serif; font-size: 12px; color: #94a3b8; margin: 0; line-height: 1.5; }
  .flag-hint strong { color: #92400e; }
  .card-footer {
    display: flex; justify-content: flex-end; gap: 10px;
    padding: 14px 20px 18px; border-top: 1px solid #f1f5f9;
  }
  .btn-ghost {
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
    color: #64748b; background: none; border: 1.5px solid #e2e8f0;
    border-radius: 8px; padding: 8px 18px; cursor: pointer;
    transition: border-color .15s, color .15s, background .15s;
  }
  .btn-ghost:hover { border-color: #cbd5e1; color: #334155; background: #f8fafc; }
  .btn-primary {
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600;
    color: #fff; background: #2563eb; border: none; border-radius: 8px;
    padding: 8px 22px; cursor: pointer;
    transition: background .15s, transform .1s, box-shadow .15s;
  }
  .btn-primary:hover { background: #1d4ed8; box-shadow: 0 4px 12px rgba(37,99,235,.3); }
  .btn-primary.warning { background: #f59e0b; }
  .btn-primary.warning:hover { background: #d97706; box-shadow: 0 4px 12px rgba(245,158,11,.3); }
  .btn-primary:active { transform: scale(.98); }
  @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(12px) scale(.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
</style>
