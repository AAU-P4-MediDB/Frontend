<script lang="ts">
  import ImageCard from "$lib/ImageCard.svelte";
  import { Search } from "flowbite-svelte";

  import dayjs from "dayjs";

  let searchTerm = $state("");

  const patients = [
    {
      uuid: "p-001",
      name: "Colby Durdan",
      dob: "1972-04-12",
      cpr_key: 1023,
      bio_gender: true,
      pronouns: "he/him",
      clinic: "North Clinic",
      doctor: "Sophia Lee",
      weight: 88.2,
      height: 182,
      diagnoses: ["Hypertension"],
      vitals: {
        date: 1711281600,
        "heart rate": "72 bpm",
        "blood pressure": "140/90",
        Sp02: "97%",
      },
      prescriptions: { active: ["Lisinopril"] },
      pfp: "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba3026bc4e44",
    },
    {
      uuid: "p-002",
      name: "Liam Carter",
      dob: "1972-08-25", // Age 54
      cpr_key: 4452,
      bio_gender: true,
      pronouns: "he/him",
      clinic: "North Clinic",
      doctor: "Sophia Lee",
      weight: 75.0,
      height: 178,
      diagnoses: ["Asthma"],
      vitals: {
        date: 1711281600,
        "heart rate": "68 bpm",
        "blood pressure": "120/80",
        Sp02: "99%",
      },
      prescriptions: { active: ["Albuterol"] },
      pfp: "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba2c545a3381",
    },
    {
      uuid: "p-003",
      name: "Ethan Patel",
      dob: "1997-01-15", // Age 29
      cpr_key: 8891,
      bio_gender: true,
      pronouns: "he/him",
      clinic: "North Clinic",
      doctor: "Sophia Lee",
      weight: 70.5,
      height: 175,
      diagnoses: ["Routine Checkup"],
      vitals: {
        date: 1711281600,
        "heart rate": "62 bpm",
        "blood pressure": "118/75",
        Sp02: "99%",
      },
      prescriptions: { active: [] },
      pfp: "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba2ceafa1e19",
    },
    {
      uuid: "p-004",
      name: "Olivia Martinez",
      dob: "1991-03-30", // Age 35
      cpr_key: 2234,
      bio_gender: false,
      pronouns: "she/her",
      clinic: "North Clinic",
      doctor: "John Cena", // Updated
      weight: 62.0,
      height: 165,
      diagnoses: ["Anemia"],
      vitals: {
        date: 1711281600,
        "heart rate": "75 bpm",
        "blood pressure": "110/70",
        Sp02: "98%",
      },
      prescriptions: { active: ["Iron Supplement"] },
      pfp: "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba2d1e53c9bf",
    },
    {
      uuid: "p-005",
      name: "Noah Kim",
      dob: "1991-07-11", // Age 35
      cpr_key: 9901,
      bio_gender: true,
      pronouns: "he/him",
      clinic: "North Clinic",
      doctor: "Sophia Lee",
      weight: 80.0,
      height: 180,
      diagnoses: ["Vitamin D Deficiency"],
      vitals: {
        date: 1711281600,
        "heart rate": "70 bpm",
        "blood pressure": "122/82",
        Sp02: "98%",
      },
      prescriptions: { active: ["Vitamin D3"] },
      pfp: "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba24b41ed4ea",
    },
    {
      uuid: "p-006",
      name: "Ava Johnson",
      dob: "1989-12-05", // Age 37
      cpr_key: 3341,
      bio_gender: false,
      pronouns: "she/her",
      clinic: "North Clinic",
      doctor: "John Cena", // Updated
      weight: 68.5,
      height: 168,
      diagnoses: ["Migraine"],
      vitals: {
        date: 1711281600,
        "heart rate": "78 bpm",
        "blood pressure": "115/75",
        Sp02: "99%",
      },
      prescriptions: { active: ["Sumatriptan"] },
      pfp: "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba2d8ead7b33",
    },
    {
      uuid: "p-007",
      name: "Lucas Brown",
      dob: "1986-02-18", // Age 40
      cpr_key: 5562,
      bio_gender: true,
      pronouns: "he/him",
      clinic: "North Clinic",
      doctor: "Sophia Lee",
      weight: 92.0,
      height: 185,
      diagnoses: ["Lower Back Pain"],
      vitals: {
        date: 1711281600,
        "heart rate": "71 bpm",
        "blood pressure": "128/84",
        Sp02: "97%",
      },
      prescriptions: { active: ["Ibuprofen"] },
      pfp: "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba2ddaa65d3f",
    },
    {
      uuid: "p-008",
      name: "Mia Rodriguez",
      dob: "2000-05-22", // Age 26
      cpr_key: 7781,
      bio_gender: false,
      pronouns: "she/her",
      clinic: "North Clinic",
      doctor: "Sophia Lee",
      weight: 58.0,
      height: 162,
      diagnoses: ["Routine Screening"],
      vitals: {
        date: 1711281600,
        "heart rate": "65 bpm",
        "blood pressure": "112/72",
        Sp02: "100%",
      },
      prescriptions: { active: [] },
      pfp: "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba2ef58f784a",
    },
    {
      uuid: "p-009",
      name: "Isabella Lee",
      dob: "1999-09-09",
      cpr_key: 1123,
      bio_gender: false,
      pronouns: "she/her",
      clinic: "North Clinic",
      doctor: "John Cena", // Updated
      weight: 55.5,
      height: 160,
      diagnoses: ["Allergic Rhinitis"],
      vitals: {
        date: 1711281600,
        "heart rate": "74 bpm",
        "blood pressure": "110/68",
        Sp02: "99%",
      },
      prescriptions: { active: ["Loratadine"] },
      pfp: "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba2e15515d35",
    },
    {
      uuid: "p-010",
      name: "Sebastian Wilson",
      dob: "1969-11-30",
      cpr_key: 6654,
      bio_gender: true,
      pronouns: "he/him",
      clinic: "North Clinic",
      doctor: "John Cena", // Updated
      weight: 95.2,
      height: 188,
      diagnoses: ["Type 2 Diabetes"],
      vitals: {
        date: 1711281600,
        "heart rate": "76 bpm",
        "blood pressure": "135/85",
        Sp02: "96%",
      },
      prescriptions: { active: ["Metformin"] },
      pfp: "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba2e502e45a7",
    },
    {
      uuid: "p-011",
      name: "Charlotte Davis",
      dob: "1994-06-14",
      cpr_key: 4432,
      bio_gender: false,
      pronouns: "she/her",
      clinic: "North Clinic",
      doctor: "John Cena", // Updated
      weight: 64.0,
      height: 170,
      diagnoses: ["Post-Op Recovery"],
      vitals: {
        date: 1711281600,
        "heart rate": "72 bpm",
        "blood pressure": "118/78",
        Sp02: "98%",
      },
      prescriptions: { active: ["Oxycodone (Temporary)"] },
      pfp: "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba2e96549117",
    },
    {
      uuid: "p-012",
      name: "Malte Jasonsen",
      dob: "1972-12-24",
      cpr_key: 9002,
      bio_gender: true,
      pronouns: "he/him",
      clinic: "North Clinic",
      doctor: "John Cena", // Updated
      weight: 85.0,
      height: 180,
      diagnoses: ["Hyperlipidemia"],
      vitals: {
        date: 1711281600,
        "heart rate": "69 bpm",
        "blood pressure": "125/82",
        Sp02: "98%",
      },
      prescriptions: { active: ["Atorvastatin"] },
      pfp: "https://pp.voxvoltera.com/assets/by-file-media-id/78742b37-89de-81f6-8007-ba2f3ac31dad",
    },
  ];

  // 2. Then, we apply the search filter on those specific patients
  let filteredItems = $derived(
    patients.filter(
      (patient) =>
        !searchTerm ||
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );
  // Helper to calculate age from DOB string (Spec 3.3.1 requirement)
  const calculateAge = (dob: string) => dayjs().diff(dayjs(dob), "year");
</script>

<div class="mb-6">
  <h2 class="text-xl font-semibold text-gray-700 mb-2">My Assigned Patients</h2>
  <Search
    size="md"
    clearable
    bind:value={searchTerm}
    placeholder="Search by name..."
  />
</div>

<hr class="border-gray-200 my-6" />

{#if filteredItems.length > 0}
  <div class="grid grid-cols-4 gap-4">
    {#each filteredItems as patient}
      <a href="/patients/dashboard">
        <ImageCard
          name={patient.name}
          pronouns={patient.pronouns}
          age={calculateAge(patient.dob).toString()}
          pfp={patient.pfp}
        /></a
      >
    {/each}
  </div>
{:else}
  <div
    class="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200"
  >
    <p class="text-gray-500">No patients found matching your criteria.</p>
  </div>
{/if}
