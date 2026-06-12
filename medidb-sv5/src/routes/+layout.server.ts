import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals, setHeaders }) => {
  setHeaders({
    "cache-control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  });

  return {
    user: locals.user,
  };
};
