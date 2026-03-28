<script>
  import { Label, Input } from "flowbite-svelte";
  import DefaultButton from "$lib/DefaultButton.svelte";
</script>

<div class="mb-6">
  <Label for="default-input" class="mb-2 block dark:text-black">Email</Label>
  <Input id="default-input" placeholder="Email" />
  <DefaultButton>Fetch doctor</DefaultButton>
</div>

<style>
  /* Something to make it look pretty */
</style>
