import type { Paket } from "@/types/paket.types";
import { api } from "./api";

export async function getAllPaket(): Promise<Paket[]> {
  const res = await api.get<Paket[]>("/paket/all");
  return res.data;
}