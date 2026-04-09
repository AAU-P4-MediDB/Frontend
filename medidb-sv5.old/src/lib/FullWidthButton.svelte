<script lang="ts">
  import { goto } from "$app/navigation";
  import type { MouseEventHandler } from 'svelte/elements';

  interface Props {
    href?: string;
    buttonAction?: MouseEventHandler<HTMLButtonElement>;
    children?: import('svelte').Snippet;
  }

  let { 
    href = "/", 
    buttonAction = () => goto(href), 
    children 
  }: Props = $props();
</script>

<button
  class="my-4 h-10 w-full text-gray-700 font-bold bg-lighter rounded-lg shadow-md hover:bg-light duration-300 ease-in-out"
  onclick={buttonAction}
>
  {@render children?.()}
</button>