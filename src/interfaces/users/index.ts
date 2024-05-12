export interface UserRegisterInterface {
    name: string;
    email: string;
    phone?: string;
    password: string;
}

export interface UserAuthorizationInterface {
    email: string;
    password: string;
}
