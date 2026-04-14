<script>
  import { Card } from "flowbite-svelte";
  
  let { data } = $props();

  console.log("patients", data.patients);
  console.log("testResults", data.testResults);

</script>

<!-- well the reference isn't less placeholdery than this, so you're on your own ;) -->

<div
  class="flex h-screen gap-6 p-6 max-w-300 mx-auto overflow-hidden bg-gray-50"
>
  <div class="flex flex-col gap-4 w-80 shrink-0 overflow-y-auto pr-2">
    <Card href="#" class="p-4">
      <h5 class="mb-1 text-lg font-bold text-gray-900">John Cena</h5>
      <p class="text-sm text-gray-600">Blood Test - 04/10/2026</p>
      <p class="text-sm text-gray-500">Status: Definitive</p>
    </Card>

    <Card href="#" class="p-4 opacity-60">
      <h5 class="mb-1 text-lg font-bold text-gray-900">John Cena</h5>
      <p class="text-sm text-gray-600">Blood Test - 04/10/2026</p>
      <p class="text-sm text-gray-500">Status: Definitive</p>
    </Card>
  </div>

  <div
    class="flex-1 bg-white rounded-xl border border-gray-200 p-8 overflow-y-auto shadow-sm"
  >
    <h2 class="text-xl font-bold mb-6 text-gray-800">Information</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="flex flex-col gap-6">
        <div class="p-6 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
          <h3 class="font-bold mb-4">Subject</h3>
          <p class="text-gray-700">John Cena</p>
          <p class="text-gray-700">45yrs</p>
          <p class="text-gray-700">Male</p>
        </div>

        <div class="p-6 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
          <h3 class="font-bold mb-4">Test Info</h3>
          <p class="text-gray-700">Blood test</p>
          <p class="text-gray-700">07/10/2026 - Definitive</p>
          <p class="text-gray-700">04/10/2026 - Dr. Vanna Bardot</p>
        </div>
      </div>

      <div class="p-6 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
        <h3 class="font-bold mb-4">Results</h3>
        <div class="text-gray-600 space-y-4 text-sm leading-relaxed">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            faucibus ex sapien vitae pellentesque sem placerat.
          </p>
          <p>
            In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean
            sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus
            bibendum egestas.
          </p>
          <p>
            Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
            hendrerit semper vel class aptent taciti sociosqu. Ad litora
            torquent per conubia nostra inceptos himenaeos.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
