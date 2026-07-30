import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthUser } from "./authService";

const STORAGE_KEY = "@jobtime:user";

class SessionService {
  async saveUser(user: AuthUser): Promise<void> {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(user)
    );
  }

  async getUser(): Promise<AuthUser | null> {
    const data = await AsyncStorage.getItem(STORAGE_KEY);

    if (!data) {
      return null;
    }

    return JSON.parse(data);
  }

  async removeUser(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEY);
  }
}

export const sessionService = new SessionService();