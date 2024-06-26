// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

// console.log('baseUrl: ', baseUrl);

class AuthUrls {
    baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl + '/auth';
    }

    getRegisterUrl(): string {
        return this.baseUrl + '/registration';
    }

    getLoginUrl(): string {
        return this.baseUrl + '/login';
    }

    getLogoutUrl(): string {
        return this.baseUrl + '/logout';
    }

    getUserInfoUrl(): string {
        return this.baseUrl + '/user-info';
    }

    getVerifyUrl(): string {
        return this.baseUrl + '/verify';
    }

    getRecoveryPassword(): string {
        return this.baseUrl + '/recovery-password';
    }

    getChangePassword(): string {
        return this.baseUrl + '/change-password';
    }

    getNewPassword(): string {
        return this.baseUrl + '/new-password';
    }

    getConfirmUrl(confirmationCode: string): string {
        return this.baseUrl + `/confirm/${confirmationCode}`;
    }
}

export const authUrls = new AuthUrls('/server');
