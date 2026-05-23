import type {
  AuthResult,
  RegisterInput,
  Session,
} from "../../types/auth";

export interface IAuthService {
  signIn(email: string, password: string): Promise<AuthResult>;
  signUp(data: RegisterInput): Promise<AuthResult>;
  signOut(): Promise<void>;
  getSession(): Promise<Session | null>;
  onAuthStateChange(
    callback: (session: Session | null) => void
  ): () => void;
}
