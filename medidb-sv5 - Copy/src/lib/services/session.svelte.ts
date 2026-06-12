// That's a bit early to create this. Love the passion, but this should really be taken in pleathera along with
// be integration to allow for the best possible security arch. with refresh tokens

import { auth } from "./auth";

// This creates a globally accessible reactive object
export const session = $state({
  user: auth.getCurrentUser(),

  refresh() {
    this.user = auth.getCurrentUser();
  },
});