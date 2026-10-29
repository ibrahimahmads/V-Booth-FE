import type { AccountResponse } from "../types/account.types";
import { api } from "./api";

export async function getMyAccount(): Promise<AccountResponse> {
  const res = await api.get<AccountResponse>("/account/me");
  return res.data;
}