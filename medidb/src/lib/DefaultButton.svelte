<script>
  import { goto } from "$app/navigation";

  export let href = "/"; // Default destination

  // Override the default action to navigate
  export let buttonAction = () => goto(href);
</script>

<button
  class="outline-cyan m-2 px-6 py-2 inline-block bg-white text-cyan rounded-lg font-bold transition cursor-pointer hover:bg-cyan hover:text-white"
  on:click={buttonAction}
>
  <slot>Go to Page</slot>
</button>

<style>
</style>
