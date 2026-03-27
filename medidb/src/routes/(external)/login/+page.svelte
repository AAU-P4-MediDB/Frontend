<script lang="ts">
  import { Card, Button, Label, Input, Checkbox } from "flowbite-svelte";
  import DefaultButton from "$lib/DefaultButton.svelte";
  import { goto } from "$app/navigation";
</script>

<div class="absolute p-4 text-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" >
  <Card class="p-6 sm:p-8 md:p-11 w-96 bg-center bg-cover" style="background-image: url('https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba4484ec8c29'); filter: brightness(0.9)">
    <form class="flex flex-col space-y-8" action="/">
      <h3 class="text-2xl font-medium text-[--medi-cyan]">Sign in to our platform</h3>
      <Label class="space-y-3 text-[--medi-cyan]/20">
        <span>Email</span>
        <Input
          class="text-base py-3 px-4 bg-white/60 backdrop-blur-md"
          type="email"
          name="email"
          placeholder="name@company.com"
          required
        />
      </Label>
      <Label class="space-y-3 text-[--medi-cyan]/20">
        <span>Your password</span>
        <Input
          class="text-base py-3 px-4 bg-white/60 backdrop-blur-md"
          type="password"
          name="password"
          placeholder="•••••"
          required
        />
      </Label>
      <div class="flex items-start">
        <Checkbox class="text-base text-[--medi-cyan] shadow-black/20">Remember me</Checkbox>
      </div>
      <DefaultButton href="/home">Login</DefaultButton>
    </form>
  </Card>
</div>

