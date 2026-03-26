<script>
  import '../app.css';
  import Sidebar from '$lib/components/Sidebar.svelte';

  // Track which nav item is active. SvelteKit's $page store is the real-world way,
  // but for learning we keep it simple with a prop passed down.
  let activePage = 'dashboard';
</script>

<div class="shell">
  <Sidebar bind:activePage />

  <main class="content">
    <slot />
  </main>
</div>

<style>
  .shell {
    display: flex;
    height: 100vh;
    overflow: hidden;
  }

  .content {
    flex: 1;
    overflow-y: auto;
    padding: 2rem 2.5rem;
    background: var(--bg);
  }
</style>
