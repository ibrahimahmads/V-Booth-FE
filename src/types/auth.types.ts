import type { AccountResponse } from "./account.types";

export interface RegisterAccount{
    name:string;
    username:string;
    email:string;
    password:string;
}

export interface LoginResponse{
    account:AccountResponse;
    token:string;
}

export interface LoginRequest{
    emailOrUsername:string;
    password:string;
}