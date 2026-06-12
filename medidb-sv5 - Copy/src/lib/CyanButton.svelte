<script lang="ts">
  import { goto } from "$app/navigation";
  import type { MouseEventHandler } from "svelte/elements";

  interface Props {
    href?: string;
    onclick?: MouseEventHandler<HTMLButtonElement>;
    children?: import("svelte").Snippet;
  }

  let { href, onclick = href ? () => goto(href) : () => {}, children }: Props = $props();
</script>

<button
  class="h-8 w-full text-white text-sm font-bold bg-dark rounded-lg shadow-md hover:bg-light hover:text-darker duration-200 ease-in-out cursor-pointer"
  {onclick}
>
  {@render children?.()}
</button>