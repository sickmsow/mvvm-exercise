import express, { Request, Response } from 'express';
import registerController from '../controllers/registerController';
import loginController from '../controllers/loginController';

const router = express.Router();


router.post('/register', async (req: Request, res: Response) => {
  try {
    await registerController.add(req, res);
  } catch (err) {
    res.status(500).json({ error: 'Server error during registration.' });
  }
});


router.post('/login', async (req: Request, res: Response) => {
  try {
    await loginController.login(req, res);
  } catch (err) {
    res.status(500).json({ error: 'Server error during login.' });
  }
});

export default router;
