<script>
  import { goto } from "$app/navigation";
  let { href = "/", buttonAction = () => goto(href), children } = $props();
</script>

<button
  class="h-10 w-full my-4 text-gray-800 font-bold bg-light rounded-lg shadow-md hover:bg-dark hover:text-white duration-300 ease-in-out"
  onclick={buttonAction}
>
  {@render children?.()}
</button>
