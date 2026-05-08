import { Router } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

const router = Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const userRepository = AppDataSource.getRepository(User);

  // Security fix: Role is forced to 'Member' for public registration
  // Only an existing Owner/Admin should be able to promote users
  const passwordHash = await bcrypt.hash(password, 10);
  const user = userRepository.create({ email, passwordHash, role: 'Member' });

  try {
    await userRepository.save(user);
    res.json({ message: 'User created' });
  } catch (e) {
    res.status(400).json({ error: 'Email already exists' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'secret');
  res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
});

export default router;
