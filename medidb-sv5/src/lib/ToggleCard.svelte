<script lang="ts">
  import { Toggle } from "flowbite-svelte";

  interface Props {
    children?: import("svelte").Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="flex my-4 items-center gap-4">
  <div>
    <div class="text-m font-bold">
      <Toggle>{@render children?.()}</Toggle>
    </div>
  </div>
</div>
