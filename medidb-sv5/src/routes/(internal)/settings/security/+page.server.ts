import { api } from "$lib/server/api";
import type { PageServerLoad } from "./$types";

export interface RegisteredKey {
  uuid: string;
  publicId: string;
  label: string | null;
}

export const load: PageServerLoad = async ({ locals }) => {
  let yubikeys: RegisteredKey[] = [];

  try {
    yubikeys = await api.get<RegisteredKey[]>("/api/um/mfa/yubikey", undefined, locals.token);
  } catch {
    // user has no keys yet or endpoint unavailable
  }

  return { yubikeys };
};
