<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  interface Props {
    open?: boolean;
  }

  let { open = $bindable(false) }: Props = $props();

  let title    = $state('');
  let date     = $state('');
  let note     = $state('');
  let duration = $state('');

  const dispatch = createEventDispatcher<{
    submit: { title: string; date: string; note: string; duration: string };
  }>();

  function close() { open = false; }

  function submit() {
    dispatch('submit', { title, date, note, duration });
    close();
  }
</script>

{#if open}
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <div class="overlay" onclick={(e) => { if (e.target === e.currentTarget) close(); }}>
    <div class="card" role="dialog" aria-modal="true">
      <div class="card-header">
        <span class="card-tag">APPOINTMENT</span>
        <button class="close-btn" onclick={close} aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <div class="card-body">
        <div class="field">
          <label for="c2-title">Title</label>
          <input id="c2-title" type="text" bind:value={title} placeholder="Appointment title…" />
        </div>
        <div class="row">
          <div class="field">
            <label for="c2-date">Date</label>
            <input id="c2-date" type="date" bind:value={date} />
          </div>
          <div class="field">
            <label for="c2-duration">Duration</label>
            <div class="input-unit">
              <input id="c2-duration" type="number" min="5" step="5" bind:value={duration} placeholder="30" />
              <span class="unit">min</span>
            </div>
          </div>
        </div>
        <div class="field">
          <label for="c2-note">Note</label>
          <textarea id="c2-note" bind:value={note} placeholder="Additional notes…" rows="3"></textarea>
        </div>
      </div>

      <div class="card-footer">
        <button class="btn-ghost" onclick={close}>Cancel</button>
        <button class="btn-primary" onclick={submit}>Submit</button>
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
    color: #0891b2; background: #ecfeff;
    padding: 3px 8px; border-radius: 4px;
  }
  .close-btn {
    background: none; border: none; cursor: pointer; color: #94a3b8;
    padding: 4px; border-radius: 6px; display: flex; align-items: center;
    transition: color .15s, background .15s;
  }
  .close-btn:hover { color: #334155; background: #f1f5f9; }
  .card-body { padding: 20px; display: flex; flex-direction: column; gap: 16px; }
  .row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .field { display: flex; flex-direction: column; gap: 5px; }
  label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px; font-weight: 600; letter-spacing: .1em;
    text-transform: uppercase; color: #64748b;
  }
  input, textarea {
    font-family: 'DM Sans', sans-serif; font-size: 14px; color: #0f172a;
    background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 8px;
    padding: 9px 12px; outline: none; width: 100%; box-sizing: border-box;
    transition: border-color .15s, box-shadow .15s, background .15s;
  }
  input::placeholder, textarea::placeholder { color: #94a3b8; }
  input:focus, textarea:focus {
    border-color: #0891b2; background: #fff;
    box-shadow: 0 0 0 3px rgba(8,145,178,.1);
  }
  .input-unit { position: relative; display: flex; align-items: center; }
  .input-unit input { padding-right: 42px; }
  .unit { position: absolute; right: 12px; font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #94a3b8; pointer-events: none; }
  textarea { resize: vertical; min-height: 72px; line-height: 1.5; }
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
    color: #fff; background: #0891b2; border: none; border-radius: 8px;
    padding: 8px 22px; cursor: pointer;
    transition: background .15s, transform .1s, box-shadow .15s;
  }
  .btn-primary:hover { background: #0e7490; box-shadow: 0 4px 12px rgba(8,145,178,.3); }
  .btn-primary:active { transform: scale(.98); }
  @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(12px) scale(.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
</style>
