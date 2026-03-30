// src/lib/services/auth.ts
import { MOCK_USERS } from "../mocks/users";
import { browser } from "$app/environment"; // SvelteKit specific check

export const auth = {
  login: async (email: string) => {
    // Simulate API delay
    await new Promise((res) => setTimeout(res, 500));

    const user = MOCK_USERS.find((u) => u.email === email);

    if (user) {
      localStorage.setItem("mock_user", JSON.stringify(user));
      return { success: true, user };
    }

    return { success: false, message: "User not found" };
  },

  logout: () => {
    localStorage.removeItem("mock_user");
  },

  getCurrentUser: () => {
    if (!browser) return null;
    const data = localStorage.getItem("mock_user");
    return data ? JSON.parse(data) : null;
  },
};
