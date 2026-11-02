import type { AccountResponse, ChangePasswordRequest, EditAccountRequest } from "../types/account.types";
import { api } from "./api";

export async function getMyAccount(): Promise<AccountResponse> {
  const res = await api.get<AccountResponse>("/account/me");
  return res.data;
}

export async function changePassword(payload:ChangePasswordRequest): Promise<string> {
  const res = await api.post<string>("/account/change-password",payload);
  return res.data;
}

export async function editAccountProfil(payload:EditAccountRequest): Promise<AccountResponse> {
  const res = await api.post<AccountResponse>("/account/edit/me",payload);
  return res.data;
}
