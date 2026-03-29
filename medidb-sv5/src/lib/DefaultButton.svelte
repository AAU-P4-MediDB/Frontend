<script>
  import { goto } from "$app/navigation";
  let { href = "/", buttonAction = () => goto(href), children } = $props();
</script>

<button
  class="h-10 w-full my-4 text-white font-bold bg-dark rounded-lg shadow-md hover:bg-darker hover:text-white duration-300 ease-in-out"
  onclick={buttonAction}
>
  {@render children?.()}
</button>
