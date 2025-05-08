import { Request, Response } from 'express';
import { User } from '../models/userModal'; 
import { add } from '../models/userModal'; 

interface RegistrationRequest {
  name: string;
  email: string;
  password: string;
}

const registerController = {
  add: async (req: Request, res: Response): Promise<Response> => {
    const { name, email, password }: RegistrationRequest = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required." });
    }

    try {
      await add({ name, email, password });

      return res.status(201).json({ message: "User registered successfully." });
    } catch (err) {
      console.error("Registration error:", err);
      return res.status(500).json({ error: "Server error." });
    }
  }
};

export default registerController;
