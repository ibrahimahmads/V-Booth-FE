export interface AccountResponse{
    id:string;
    name:string;
    username:string;
    email:string;
    isEmailVerified:boolean;
    hasPassword:boolean;
    role:"ADMIN"|"USER";
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