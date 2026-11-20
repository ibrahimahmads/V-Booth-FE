export interface AccountResponse{
    id:string;
    name:string;
    username:string;
    email:string;
    isEmailVerified:boolean;
    hasPassword:boolean;
    role:Role;
}

export interface ChangePasswordRequest{
    oldPassword:string;
    newPassword:string;
}

export interface EditAccountRequest{
    name:string;
    username:string;
    email:string;
}

export interface Account{
    id:string;
    name:string;
    username:string;
    email:string;
    isEmailVerified:boolean;
    googleId:string;
    role:Role;
}

type Role = "ADMIN"|"USER";