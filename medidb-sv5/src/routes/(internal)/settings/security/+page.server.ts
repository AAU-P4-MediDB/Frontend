import { api } from "$lib/server/api";
import type { PageServerLoad } from "./$types";

export interface RegisteredKey {
  uuid: string;
  publicId: string;
  label: string | null;
}

export interface MfaStatus {
  totpEnabled: boolean;
  yubikeyEnabled: boolean;
}

export const load: PageServerLoad = async ({ locals }) => {
  let yubikeys: RegisteredKey[] = [];
  let mfaStatus: MfaStatus = { totpEnabled: false, yubikeyEnabled: false };

  try {
    yubikeys = await api.get<RegisteredKey[]>("/api/um/mfa/yubikey", undefined, locals.token);
  } catch {
    // no keys yet
  }

  try {
    mfaStatus = await api.get<MfaStatus>("/api/um/mfa/status", undefined, locals.token);
  } catch {
    // default to false
  }

  return { yubikeys, mfaStatus };
};
