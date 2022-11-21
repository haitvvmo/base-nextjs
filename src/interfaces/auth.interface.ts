export interface UserSignIn {
  email: string;
  password: string;
}

export interface UserAuth {
  userName: string;
  userId: number;
}

export interface PayloadSignin {
    email: string;
    sub: string;
    name: string;
}

export interface AuthResult {
    access_token: string;
    payload: PayloadSignin;
}