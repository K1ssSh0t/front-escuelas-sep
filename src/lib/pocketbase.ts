import PocketBase from "pocketbase";

export const url = import.meta.env.VITE_POCKETBASE_URL;
export const client = new PocketBase(url);
