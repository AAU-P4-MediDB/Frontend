<script>
    import { goto } from "$app/navigation";

  let menuOpen = $state(false);
</script>

<button onclick={() => menuOpen = !menuOpen}>☰</button>

{#if menuOpen}
  <div style="display: flex; flex-direction: column; align-items: center;">
    <button onclick={() => goto('login')}>login</button>
    <button onclick={() => goto('patient_dashboard')}>Patient dashboard</button>
    <button>lorem ipsum</button>
    <button>lorem ipsum</button>
  </div>
{/if}