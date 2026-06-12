<!-- POST /api/dpm/usrup/{uuid}/journal -->

<script lang="ts">
  interface Props {
    open?: boolean;
    patientUuid: string;
    onsubmitted?: (detail: { patient_summary: string; summary: string; category: string; notes: string }) => void;
  }

  let { open = $bindable(false), patientUuid, onsubmitted }: Props = $props();

  let patient_summary    = $state('');
  let summary  = $state('');
  let category = $state('');
  let notes    = $state('');

  let loading = $state(false);
  let error   = $state<string | null>(null);

  const categories = ['General', 'Follow-up', 'Urgent', 'Routine', 'Specialist', 'Emergency'];

  function close() {
    open = false;
    error = null;
  }

  async function submit() {
    error = null;
    loading = true;

    const unixTime = Math.floor(Date.now() / 1000);
    
    const payload = {
      journal: {
        date: unixTime,
        patient_summary,
        summary,
        category,
        notes,
      }
    };

    try {
      const res = await fetch(`/api/dpm/usrup/${patientUuid}/journal`, {
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

      onsubmitted?.({ patient_summary, summary, category, notes });
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
        <span class="card-tag">NOTE</span>
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
          <label for="c1-patient_summary">patient_summary</label>
          <input id="c1-patient_summary" type="text" bind:value={patient_summary} placeholder="Entry patient_summary…" disabled={loading} />
        </div>
        <div class="field">
          <label for="c1-summary">Summary</label>
          <input id="c1-summary" type="text" bind:value={summary} placeholder="Brief summary…" disabled={loading} />
        </div>
        <div class="field">
          <label for="c1-category">Category</label>
          <div class="select-wrap">
            <select id="c1-category" bind:value={category} disabled={loading}>
              <option value="" disabled>Select category…</option>
              {#each categories as cat}
                <option value={cat}>{cat}</option>
              {/each}
            </select>
            <svg class="chevron" width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
        <div class="field">
          <label for="c1-notes">Notes</label>
          <textarea id="c1-notes" bind:value={notes} placeholder="Additional notes…" rows="3" disabled={loading}></textarea>
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
    color: #2563eb; background: #eff6ff;
    padding: 3px 8px; border-radius: 4px;
  }
  .close-btn {
    background: none; border: none; cursor: pointer; color: #94a3b8;
    padding: 4px; border-radius: 6px; display: flex; align-items: center;
    transition: color .15s, background .15s;
  }
  .close-btn:hover { color: #334155; background: #f1f5f9; }
  .card-body { padding: 20px; display: flex; flex-direction: column; gap: 16px; }
  .field { display: flex; flex-direction: column; gap: 5px; }
  label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px; font-weight: 600; letter-spacing: .1em;
    text-transform: uppercase; color: #64748b;
  }
  input, select, textarea {
    font-family: 'DM Sans', sans-serif; font-size: 14px; color: #0f172a;
    background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 8px;
    padding: 9px 12px; outline: none; width: 100%; box-sizing: border-box;
    transition: border-color .15s, box-shadow .15s, background .15s;
  }
  input::placeholder, textarea::placeholder { color: #94a3b8; }
  input:focus, select:focus, textarea:focus {
    border-color: #3b82f6; background: #fff;
    box-shadow: 0 0 0 3px rgba(59,130,246,.1);
  }
  .select-wrap { position: relative; }
  .select-wrap select { appearance: none; padding-right: 32px; cursor: pointer; }
  .chevron { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); pointer-events: none; color: #94a3b8; }
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
    color: #fff; background: #2563eb; border: none; border-radius: 8px;
    padding: 8px 22px; cursor: pointer;
    transition: background .15s, transform .1s, box-shadow .15s;
  }
  .btn-primary:hover { background: #1d4ed8; box-shadow: 0 4px 12px rgba(37,99,235,.3); }
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
  input:disabled, select:disabled, textarea:disabled { opacity: 0.6; cursor: not-allowed; }
  @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(12px) scale(.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
</style>
