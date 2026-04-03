<script lang="ts">
  import { Card, Button } from "flowbite-svelte";

  interface Props {
    title: string;
    buttonText: string;
    // Update the type to accept the event
    onsubmit: (e: SubmitEvent) => void;
    fields: import("svelte").Snippet;
  }

  let { title, buttonText, onsubmit, fields }: Props = $props();

  // We create a local middleman function to handle the preventDefault
  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    onsubmit(e);
  }
</script>

<Card size="sm" class="bg-light w-full h-full border-none px-6 py-6 rounded-xl">
  <h3 class="mb-4 text-md font-bold text-gray-700">{title}</h3>

  <form onsubmit={handleSubmit} class="flex flex-col gap-4">
    {@render fields()}

    <Button
      type="submit"
      color="light"
      class=" mt-2  w-full text-gray-800 font-bold rounded-lg shadow-md hover:bg-dark hover:text-white duration-300 ease-in-out"
    >
      {buttonText}
    </Button>
  </form>
</Card>
