import { writable } from "svelte/store";

export const boardState = writable([[0,0,0],[2,0,0],[2,2,1]]);
export const chance = writable(false);
export const score = writable({you:0,other:0});
export const websocket = writable(undefined);
export const icon = writable(2);
export const mode = writable(0); // 0 -> free , 1 -> selecting
export const statusMessage = writable("");