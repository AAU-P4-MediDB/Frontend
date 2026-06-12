<!-- POST /api/dpm/usrup/{uuid}/prescription -->

<script lang="ts">
  interface Props {
    open?: boolean;
    patientUuid: string;
    onsubmitted?: (detail: { name: string; instruction: string; dose: string; duration: string; date: string }) => void;
  }

  let { open = $bindable(false), patientUuid, onsubmitted }: Props = $props();

  let name        = $state('');
  let instruction = $state('');
  let dose        = $state('');
  let duration    = $state('');
  let date        = $state('');

  let loading = $state(false);
  let error   = $state<string | null>(null);

  function close() {
    open = false;
    error = null;
  }

  async function submit() {
    error = null;
    loading = true;

    const unixTime = date ? Math.floor(new Date(date).getTime() / 1000) : null;

    const payload = {
      name,
      instruction,
      dosage: dose,
      duration_days: duration ? Number(duration) : null,
      date: unixTime,
    };

    try {
      const res = await fetch(`/api/dpm/usrup/${patientUuid}/prescription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message ?? `Request failed (${res.status})`);
      }

      onsubmitted?.({ name, instruction, dose, duration, date });
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
        <span class="card-tag">PRESCRIPTION</span>
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
        <div class="row">
          <div class="field">
            <label for="c3-name">Name</label>
            <input id="c3-name" type="text" bind:value={name} placeholder="Medication name..." disabled={loading} />
          </div>
          <div class="field">
            <label for="c3-instruction">Instruction</label>
            <input id="c3-instruction" type="text" bind:value={instruction} placeholder="Instructions..." disabled={loading} />
          </div>
        </div>
        <div class="row">
          <div class="field">
            <label for="c3-dose">Dose</label>
            <div class="input-unit">
              <input id="c3-dose" type="text" bind:value={dose} placeholder="500" disabled={loading} />
              <span class="unit">mg</span>
            </div>
          </div>
          <div class="field">
            <label for="c3-duration">Duration</label>
            <div class="input-unit">
              <input id="c3-duration" type="number" min="1" bind:value={duration} placeholder="7" disabled={loading} />
              <span class="unit">days</span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="field">
            <label for="c3-date">Start date</label>
            <input id="c3-date" type="date" bind:value={date} disabled={loading} />
          </div>
        </div>
        <div class="info-strip">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style="min-width:14px">
            <circle cx="7" cy="7" r="6" stroke="#6366f1" stroke-width="1.4"/>
            <path d="M7 6.5V10M7 4.5V5" stroke="#6366f1" stroke-width="1.6" stroke-linecap="round"/>
          </svg>
          Verify dose with prescribing physician before entry.
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
    color: #6366f1; background: #eef2ff;
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
  input {
    font-family: 'DM Sans', sans-serif; font-size: 14px; color: #0f172a;
    background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 8px;
    padding: 9px 12px; outline: none; width: 100%; box-sizing: border-box;
    transition: border-color .15s, box-shadow .15s, background .15s;
  }
  input::placeholder { color: #94a3b8; }
  input:focus {
    border-color: #6366f1; background: #fff;
    box-shadow: 0 0 0 3px rgba(99,102,241,.1);
  }
  .input-unit { position: relative; display: flex; align-items: center; }
  .input-unit input { padding-right: 42px; }
  .unit { position: absolute; right: 12px; font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #94a3b8; pointer-events: none; }
  .info-strip {
    display: flex; align-items: center; gap: 8px;
    background: #eef2ff; border: 1px solid #c7d2fe;
    border-radius: 8px; padding: 10px 12px;
    font-family: 'DM Sans', sans-serif; font-size: 12px; color: #4338ca; line-height: 1.4;
  }
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
    color: #fff; background: #6366f1; border: none; border-radius: 8px;
    padding: 8px 22px; cursor: pointer;
    transition: background .15s, transform .1s, box-shadow .15s;
  }
  .btn-primary:hover { background: #4f46e5; box-shadow: 0 4px 12px rgba(99,102,241,.3); }
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
  input:disabled { opacity: 0.6; cursor: not-allowed; }
  @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(12px) scale(.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
</style>
