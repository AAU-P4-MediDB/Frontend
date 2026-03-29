<script>
  import { goto } from "$app/navigation";
  let { href = "/", buttonAction = () => goto(href), children } = $props();
</script>

<button
  class="my-4 h-10 w-full text-gray-700 font-bold bg-lighter rounded-lg shadow-md hover:bg-light duration-300 ease-in-out"
  onclick={buttonAction}
>
  {@render children?.()}
</button>
