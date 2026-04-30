<!-- POST http://192.168.134.6:10140/api/dpm/usrup/{uuid}/appointment -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  interface Props {
    open?: boolean;
    token: string;
    // patientUuid: string;
  }

  const cookies = null;

  const cookieHeader = cookies
		?.getAll()
		?.map((c) => `${c.name}=${c.value}`)
		?.join('; ') || '';

  let patientUuid = "e5f6a7b8-c9d0-4123-d0e1-f2a3b4c5d6e7";
  let cpr = "041272-1023"

  let { open = $bindable(false), token }: Props = $props();

  let title    = $state('');
  let date     = $state('');
  let note     = $state('');
  let duration = $state('');

  let loading = $state(false);
  let error   = $state<string | null>(null);

  const dispatch = createEventDispatcher<{
    submitted: { title: string; date: string; note: string; duration: string };
  }>();

  function close() {
    open = false;
    error = null;
  }

  async function submit() {
    error = null;
    loading = true;

    // Convert date string + duration to a Unix timestamp
    const unixTime = date ? Math.floor(new Date(date).getTime() / 1000) : null;

    const payload = {
      name: {title},
      id: patientUuid,
      cpr,
      time: unixTime,
      reason: note,
      duration_minutes: duration ? Number(duration) : null,
    };

    try {
      const res = await fetch(`http://192.168.134.6:10140/api/dpm/usrup/${patientUuid}/appointment`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Cookie': cookieHeader,
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message ?? `Request failed (${res.status})`);
      }

      dispatch('submitted', { title, date, note, duration });
      close();
    } catch (e) {
      error = e instanceof Error ? e.message : 'Something went wrong.';
    } finally {
      loading = false;
    }
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
        {#if error}
          <div class="error-banner">{error}</div>
        {/if}
        <div class="field">
          <label for="c2-title">Title</label>
          <input id="c2-title" type="text" bind:value={title} placeholder="Appointment title…" disabled={loading} />
        </div>
        <div class="row">
          <div class="field">
            <label for="c2-date">Date</label>
            <input id="c2-date" type="date" bind:value={date} disabled={loading} />
          </div>
          <div class="field">
            <label for="c2-duration">Duration</label>
            <div class="input-unit">
              <input id="c2-duration" type="number" min="5" step="5" bind:value={duration} placeholder="30" disabled={loading} />
              <span class="unit">min</span>
            </div>
          </div>
        </div>
        <div class="field">
          <label for="c2-note">Note</label>
          <textarea id="c2-note" bind:value={note} placeholder="Additional notes…" rows="3" disabled={loading}></textarea>
        </div>
      </div>

      <div class="card-footer">
        <button class="btn-ghost" onclick={close} disabled={loading}>Cancel</button>
        <button class="btn-primary" onclick={submit} disabled={loading}>
          {#if loading}
            <span class="spinner"></span> Saving…
          {:else}
            Submit
          {/if}
        </button>
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
    .error-banner {
    font-family: 'DM Sans', sans-serif; font-size: 13px;
    color: #b91c1c; background: #fef2f2;
    border: 1.5px solid #fecaca; border-radius: 8px;
    padding: 9px 12px;
  }
  .spinner {
    display: inline-block; width: 11px; height: 11px;
    border: 2px solid rgba(255,255,255,.4);
    border-top-color: #fff; border-radius: 50%;
    animation: spin .6s linear infinite;
    vertical-align: middle; margin-right: 4px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  input:disabled, textarea:disabled { opacity: 0.6; cursor: not-allowed; }
  @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(12px) scale(.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
</style>
