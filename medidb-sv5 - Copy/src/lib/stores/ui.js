import { writable } from "svelte/store";

// We export the store so it can be used in multiple components
export const isExpanded = writable(true);
