import express, { Request, Response } from 'express';
import EcSuppliers from '../Models/ec_suppliers';
import jwt from 'jsonwebtoken';
const router = express.Router();

// POST endpoint for login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { e_mail, password } = req.body;

    // Check if the email is registered
    const supplier = await EcSuppliers.findOne({ where: { e_mail } });

    if (supplier) {
      // If the email is registered, compare the password (without bcrypt for simplicity)
      if (password === supplier.password) {
        // Passwords match, login successful
        const token = jwt.sign(
            {
                userId: supplier.id,
            },
            'your-secret-key',
            {
                expiresIn: '24h'
            }
        );
        
        res.status(200).json({ message: 'Login successful' });
      } else {
        // Passwords do not match, unauthorized (401) status
        res.status(401).json({ error: 'Invalid password' });
      }
    } else {
      // Email is not registered, unauthorized (401) status
      res.status(401).json({ error: 'Email not registered' });
    }
    
  } catch (error) {
    // Internal server error (500) for unexpected issues
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
