export interface Signup {
  name: string;
  email: string;
  password?: string;
  googleId?: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface TokenPayload {
  _id: string;
  role: string;
}
