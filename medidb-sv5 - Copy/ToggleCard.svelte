<script lang="ts">
  import { Toggle } from "flowbite-svelte";

  interface Props {
    children?: import("svelte").Snippet;
    checked: boolean;
    onUpdate?: () => void;
  }

  // Use $bindable so changes in the child update the parent state
  let { children, checked = $bindable(), onUpdate }: Props = $props();
</script>

<div class="flex items-center justify-between w-full py-2">
  <span class="text-base font-normal text-gray-800">
    {@render children?.()}
  </span>
  <Toggle bind:checked onchange={onUpdate} size="default" color="blue" />
</div>
