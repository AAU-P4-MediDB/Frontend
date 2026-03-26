<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import BurgerMenu from '$lib/burgerMenu.svelte';
  	import "../../app.css";
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	
</svelte:head>

<div class="w-full h-full bg-red-500">
	<BurgerMenu />
</div>

{@render children()}
