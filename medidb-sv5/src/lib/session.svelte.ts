import { auth } from "./services/auth";

// This creates a globally accessible reactive object
export const session = $state({
  user: auth.getCurrentUser(),

  refresh() {
    this.user = auth.getCurrentUser();
  },
});
