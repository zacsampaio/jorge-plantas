import type {
  AuthError,
  AuthResult,
  RegisterInput,
  Session,
} from "../../types/auth";

export interface IAuthService {
  signIn(email: string, password: string): Promise<AuthResult>;
  signUp(data: RegisterInput): Promise<AuthResult>;
  signOut(): Promise<void>;
  /**
   * Dispara o e-mail de recuperação. Nunca informa se o e-mail existe:
   * o retorno é idêntico para conta existente e inexistente, para não
   * permitir enumeração de contas cadastradas.
   */
  requestPasswordReset(email: string): Promise<{ error: AuthError | null }>;
  /** Troca a senha do usuário na sessão de recuperação em curso. */
  updatePassword(password: string): Promise<{ error: AuthError | null }>;
  getSession(): Promise<Session | null>;
  onAuthStateChange(
    callback: (session: Session | null) => void
  ): () => void;
}
