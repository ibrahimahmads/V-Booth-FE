import type { Paket } from "@/types/paket.types";
import { create } from "zustand";

interface PaketState{
    listPaket:Paket[];
    setListPaket:(listPaket:Paket[])=>void;
}

export const usePaketStore = create<PaketState>((set)=>({
    listPaket: [],
    setListPaket:(listPaket)=>set({listPaket}),
}))