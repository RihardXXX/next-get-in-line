export interface UserRegisterInterface {
    name: string;
    email: string;
    phone?: string;
    password: string;
}

export interface UserAuthorizationInterface {
    email: string;
    password: string | number;
}

export interface UserVerifyOtpInterface {
    email: string;
    otp: string | number;
}

export interface EmailRecoveryInterface {
    email: string;
}

export interface PasswordRecoveryInterface {
    password: string;
}

export interface ActiveModeRecoveryInterface {
    _id: string;
    otp: string;
}
