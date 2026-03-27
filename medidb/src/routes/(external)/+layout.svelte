<script>
	import '../../app.css';
	import { DarkMode } from 'flowbite-svelte';
	let darkmodebtn =
		'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-lg p-2.5 fixed right-4 top-2 z-50';
</script>

<div style="background-image: url('https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba4484ec8c29'); background-size: cover; background-repeat: no-repeat; background-position: center; height: 100vh; filter: brightness(0.8) blur(30px);">
</div>

<DarkMode btnClass={darkmodebtn} />
<slot />
