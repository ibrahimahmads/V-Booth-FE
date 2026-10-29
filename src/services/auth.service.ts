import type { LoginRequest, LoginResponse, RegisterAccount } from "../types/auth.types";
import { api } from "./api";

export async function registerAccount(payload:RegisterAccount): Promise<string> {
  const res = await api.post<string>("/auth/register",payload);
  return res.data;
}

export async function login(payload:LoginRequest): Promise<LoginResponse> {
  const res = await api.post<LoginResponse>("/auth/login",payload);
  return res.data;
}

export async function logout():Promise<string> {
  const res = await api.post<string>("/auth/logout");
  return res.data;
}