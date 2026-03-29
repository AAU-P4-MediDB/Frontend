<script>
  import { goto } from "$app/navigation";

  export let href = "/"; // Default destination

  // Override the default action to navigate
  export let buttonAction = () => goto(href);
</script>

<button
  class="h-10 w-full my-4 text-gray-800 font-bold bg-light rounded-lg shadow-md hover:bg-dark hover:text-white duration-300 ease-in-out"
  on:click={buttonAction}
>
  <slot>Go to Page</slot>
</button>

<style>
</style>
