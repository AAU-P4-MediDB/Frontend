<script lang="ts">
  import { Toggle } from "flowbite-svelte";
  import type { Snippet } from "svelte";

  interface Props {
    checked: boolean;
    onUpdate?: () => void;
    children?: Snippet;
  }

  let { checked = $bindable(false), onUpdate, children }: Props = $props();

  function handleChange() {
    if (onUpdate) onUpdate();
  }
</script>

<div class="p-1">
  <Toggle
    bind:checked
    onchange={handleChange}
    color="green"
    class="w-full cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
  >
    <span class="text-sm font-medium text-gray-900">
      {#if children}
        {@render children()}
      {/if}
    </span>
  </Toggle>
</div>
