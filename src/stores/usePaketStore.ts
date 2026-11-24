import type { Paket } from "@/types/paket.types";
import { create } from "zustand";

interface PaketState{
    listPaket:Paket[];
    setListPaket:(listPaket:Paket[])=>void;
    getPaketById: (id: string) => Paket | undefined;
}

export const usePaketStore = create<PaketState>((set,get)=>({
    listPaket: [],
    setListPaket:(listPaket)=>set({listPaket}),
    getPaketById: (id) => get().listPaket.find((paket) => paket.id === id),
}))