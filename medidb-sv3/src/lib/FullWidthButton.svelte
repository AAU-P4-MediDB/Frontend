<script>
  import { goto } from "$app/navigation";

  export let href = "/"; // Default destination

  // Override the default action to navigate
  export let buttonAction = () => goto(href);
</script>

<button
  class="my-4 h-10 w-full text-gray-700 font-bold bg-lighter rounded-lg shadow-md hover:bg-light duration-300 ease-in-out"
  on:click={buttonAction}
>
  <slot>Go to Page</slot>
</button>

<style>
</style>
