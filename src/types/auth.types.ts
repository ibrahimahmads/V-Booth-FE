import type { AccountResponse } from "./account.types";

export interface RegisterAccount{
    name:string;
    username:string;
    email:string;
    password:string;
}

export interface LoginResponse{
    account:AccountResponse;
}

export interface LoginRequest{
    usernameOrEmail:string;
    password:string;
}