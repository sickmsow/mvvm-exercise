// src/services/authService.ts

import AuthViewModel from '../view_models/authViewModels';
import { User } from '../models/userModal';

interface AuthResponse {
  user?: User | null;
  error?: string;
}

class AuthService {
  async login(email: string, password: string): Promise<AuthResponse> {
    return await AuthViewModel.login(email, password);
  }

  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    return await AuthViewModel.register(name, email, password);
  }
}

export default new AuthService();
