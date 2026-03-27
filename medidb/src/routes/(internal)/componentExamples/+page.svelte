<script>
  import CyanButton from "$lib/CyanButton.svelte";
  import DefaultButton from "$lib/DefaultButton.svelte";
  import GreyButton from "$lib/GreyButton.svelte";

  import CardOverlay from "$lib/CardOverlay.svelte";
  import ImageCard from "$lib/ImageCard.svelte";
  import DefaultCard from "$lib/DefaultCard.svelte";
  import EmailCard from "$lib/EmailCard.svelte";

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
  ];
  const defaultCards = [
    {
      date: "Mar 2026",
      title: "EKG",
      description: "No heartrate detected",
      status: "red",
    },
    {
      date: "June 2026",
      title: "Ultrasound",
      description: "No baby detected",
      status: "red",
    },
    {
      date: "Aug 2026",
      title: "EKG",
      description: "Heartrate detected",
      status: "blue",
    },
  ];

  const fetchEmail = [
    {
      title: "Fetch doctor",
      email: "doctor@aau.dk",
    },
  ];
</script>

<div class="h-auto p-8 mx-auto">
  <CyanButton href="/patients/dashboard"
    >Take me to Patient Dashboard</CyanButton
  >
  <DefaultButton href="/login">Take me Login</DefaultButton>
  <GreyButton href="/login">Grey button</GreyButton>

  <div class="inline-block">
    {#each patients as patient}
      <ImageCard
        title={patient.title}
        imageUrl={patient.imageUrl}
        name={patient.name}
        gender={patient.gender}
        age={patient.age}
      />
    {/each}
  </div>

  <CardOverlay>
    <div class="my-3">Notification</div>

    {#each defaultCards as card}
      <DefaultCard
        title={card.title}
        date={card.date}
        description={card.description}
        status={card.status}
      />
    {/each}
  </CardOverlay>

  <CardOverlay>
    <div class="my-3">Hello</div>
    {#each defaultCards as card}
      <DefaultCard
        title={card.title}
        date={card.date}
        description={card.description}
        status={card.status}
      />
    {/each}
  </CardOverlay>

  <CardOverlay>
    <div class="my-3">Fetch doctor</div>

    {#each fetchEmail as email}
      <EmailCard title={email.title} email={email.email} />
    {/each}
  </CardOverlay>
</div>
