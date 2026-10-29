import { create } from "zustand";
import type { AccountResponse } from "../types/account.types";

interface AuthState{
    account:AccountResponse|null;
    setAccount:(account:AccountResponse)=>void;
    reset:()=>void;
}

export const useAuthStore = create<AuthState>((set)=>({
    account: null,
    setAccount:(account)=>set({account}),
    reset:()=>set({
        account:null,
    })
}))