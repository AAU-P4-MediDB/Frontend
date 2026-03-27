<script>
  import ImageCard from "$lib/ImageCard.svelte";
  import { Search } from "flowbite-svelte";
  const patients = [
    {
      title: "Pirate",
      name: "Emma Nielsen",
      gender: "Female",
      age: "22",
      imageUrl:
        "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba15f58c562b",
    },
    {
      title: "Chef",
      name: "John Cena",
      gender: "Male",
      age: "45",
      imageUrl:
        "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba2b06880c98",
    },
    {
      name: "Sophia Lee",
      gender: "Female",
      age: "45",
      imageUrl:
        "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba2bc07d8ed9",
    },
    {
      name: "Colby Durdan",
      gender: "Male",
      age: "54",
      imageUrl:
        "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba3026bc4e44",
    },
    {
      name: "Liam Carter",
      gender: "Male",
      age: "54",
      imageUrl:
        "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba2c545a3381",
    },
    {
      name: "Sophia Nguyen",
      gender: "Female",
      age: "28",
      imageUrl:
        "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba2c853ba9ef",
    },
    {
      name: "Ethan Patel",
      gender: "Male",
      age: "29",
      imageUrl:
        "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba2ceafa1e19",
    },
    {
      name: "Olivia Martinez",
      gender: "Female",
      age: "35",
      imageUrl:
        "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba2d1e53c9bf",
    },
    {
      name: "Noah Kim",
      gender: "Male",
      age: "35",
      imageUrl:
        "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba24b41ed4ea",
    },
    {
      name: "Ava Johnson",
      gender: "Female",
      age: "37",
      imageUrl:
        "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba2d8ead7b33",
    },
    {
      name: "Lucas Brown",
      gender: "Male",
      age: "40",
      imageUrl:
        "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba2ddaa65d3f",
    },
    {
      name: "Mia Rodriguez",
      gender: "Female",
      age: "26",
      imageUrl:
        "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba2ef58f784a",
    },
    {
      name: "Isabella Lee",
      gender: "Female",
      age: "27",
      imageUrl:
        "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba2e15515d35",
    },
    {
      name: "Sebastian Wilson",
      gender: "Male",
      age: "57",
      imageUrl:
        "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba2e502e45a7",
    },
    {
      name: "Charlotte Davis",
      gender: "Female",
      age: "32",
      imageUrl:
        "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba2e96549117",
    },
    {
      name: "Malte Jasonsen",
      gender: "Male",
      age: "54",
      imageUrl:
        "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba2f3ac31dad",
    },
  ];
</script>

<div class="m-6 search_container">
  <Search>
    <div class="me-1">Search</div>
  </Search>
</div>

<div class="grid grid-cols-4 gap-4 m-4">
  <div>
    {#each patients.slice(0, 4) as patient, i}
      <ImageCard
        title={patient.title}
        imageUrl={patient.imageUrl}
        name={patient.name}
        gender={patient.gender}
        age={patient.age}
      />
    {/each}
  </div>
  <div>
    {#each patients.slice(4, 8) as patient, i}
      <ImageCard
        title={patient.title}
        imageUrl={patient.imageUrl}
        name={patient.name}
        gender={patient.gender}
        age={patient.age}
      />
    {/each}
  </div>
  <div>
    {#each patients.slice(8, 12) as patient, i}
      <ImageCard
        title={patient.title}
        imageUrl={patient.imageUrl}
        name={patient.name}
        gender={patient.gender}
        age={patient.age}
      />
    {/each}
  </div>
  <div>
    {#each patients.slice(12, 16) as patient, i}
      <ImageCard
        title={patient.title}
        imageUrl={patient.imageUrl}
        name={patient.name}
        gender={patient.gender}
        age={patient.age}
      />
    {/each}
  </div>
</div>
