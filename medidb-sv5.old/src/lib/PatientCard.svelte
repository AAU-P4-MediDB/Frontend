<script>
  let { name, age, pronouns, diagnoses, uuid } = $props();
</script>

<div
  class="grid grid-cols-2 items-center p-2 hover:bg-gray-50 rounded-lg transition-colors"
>
  <div class="col-span-2 inline-block text-md font-bold text-gray-800">
    {name},
    <span class=" text-sm font-light top text-gray-500">
      {age} years • {pronouns}
    </span>
  </div>

  <div class="col text-sm font-light">
    {diagnoses.join(", ")}
  </div>

  <div class="col text-right">
    <a
      href="/patients/dashboard/{uuid}"
      class="text-blue-500 text-sm hover:underline"
    >
      Open Journal →
    </a>
  </div>
</div>
<hr class="border-gray-200" />
