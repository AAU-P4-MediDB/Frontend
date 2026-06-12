/// <reference types="@sveltejs/kit" />

declare namespace App {
  interface User {
    uuid: string;
    email: string;
    position: "Doctor" | "Secretary" | "Local_administrator";
  }

  interface Locals {
    token: string | undefined;
    user: User | undefined;
  }
}
