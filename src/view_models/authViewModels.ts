import { User } from '../models/userModal';
import { getUserByEmail, add } from '../models/userModal'; 

interface AuthResponse {
  user?: User | null;
  error?: string;
}

export class AuthViewModel {
  
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const user = await getUserByEmail(email);

      if (!user) {
        return { error: 'Invalid email or password.' };
      }

      // Simply compare passwords (no hashing, plain text match)
      if (user.password !== password) {
        return { error: 'Invalid email or password.' };
      }

      return { user };
    } catch (error) {
      console.error('Login Error:', error);
      return { error: 'Server error during login.' };
    }
  }

  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    try {
      const existingUser = await getUserByEmail(email);
      if (existingUser) {
        return { error: 'Email is already taken.' };
      }

      await add({ name, email, password });

      const user = await getUserByEmail(email);

      return { user };
    } catch (error) {
      console.error('Registration Error:', error);
      return { error: 'Server error during registration.' };
    }
  }
}

export default new AuthViewModel();
