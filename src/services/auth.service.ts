import type { AccountResponse } from "@/types/account.types";
import type { GoogleAuthRequest, LoginRequest, RegisterAccount } from "../types/auth.types";
import { api } from "./api";

export async function registerAccount(payload:RegisterAccount): Promise<string> {
  const res = await api.post<string>("/auth/register",payload);
  return res.data;
}

export async function login(payload:LoginRequest,loginType:"USER"|"ADMIN"): Promise<AccountResponse> {
  const res = await api.post<AccountResponse>("/auth/login",payload,{params:{loginType}});
  return res.data;
}

export async function loginGoogle(payload:GoogleAuthRequest): Promise<AccountResponse> {
  const res = await api.post<AccountResponse>("/auth/google",payload);
  return res.data;
}

export async function logout():Promise<string> {
  const res = await api.post<string>("/auth/logout");
  return res.data;
}