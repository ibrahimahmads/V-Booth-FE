export interface RegisterAccount{
    name:string;
    username:string;
    email:string;
    password:string;
}

export interface GoogleAuthRequest{
    code:string;
}

export interface LoginRequest{
    usernameOrEmail:string;
    password:string;
}