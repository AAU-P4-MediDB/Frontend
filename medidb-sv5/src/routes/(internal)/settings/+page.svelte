<!-- what is this for??? -->
 <!-- wonderfull question, of which i have no answer to -->

<script lang="ts">
  let nameValue = "";
  let emailValue = "";

  async function fetchUsers() {
    try {
      const result = await fetch("http://192.168.134.6:10140/api/um/fetch", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: nameValue, email: emailValue }),
      });

      if (result.ok) {
        const data = await result.json();
        console.log("Success:", data);
      } else {
        // 401 = Unauthorized, 403 = Forbidden, 404 = Not Found
        console.error("Access Error:", result.status, result.statusText);
      }
    } catch (error) {
      console.error("Network or CORS error:", error);
    }
    console.log("Fetch attempt completed", nameValue);
  }
</script>

<div>Settings</div>
<button class="login-btn" onclick={fetchUsers}> API </button>
