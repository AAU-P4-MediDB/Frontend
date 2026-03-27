<script>
  import { goto } from "$app/navigation";

  export let href = "/"; // Default destination

  // Override the default action to navigate
  export let buttonAction = () => goto(href);
</script>

<button
  class="h-full w-full my-2 px-6 py-2 inline-block bg-white text-gray-700 rounded-lg font-bold transition cursor-pointer shadow-lg hover:shadow-xl hover:bg-cyan hover:text-white"
  on:click={buttonAction}
>
  <slot>Go to Page</slot>
</button>

<style>
</style>
