import { sessionService } from "./sessionService";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
};

class AuthService {
  private currentUser: AuthUser | null = null;

  async login(
    email: string,
    password: string
  ): Promise<AuthUser | null> {

    // Simulação de autenticação
    const user: AuthUser = {
      id: 1,
      name: "Josemar",
      email,
    };

    this.currentUser = user;

    await sessionService.saveUser(user);

    return user;
  }

  async logout(): Promise<void> {
    this.currentUser = null;

    await sessionService.removeUser();
  }

  async loadUser(): Promise<AuthUser | null> {
    const user = await sessionService.getUser();

    this.currentUser = user;

    return user;
  }

  getCurrentUser(): AuthUser | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }
}

export const authService = new AuthService();