import bcrypt from 'bcrypt';
import { User } from '../models/user.model.js';

export const registerUser = async (username, password) => {
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new Error('User already exists');
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ username, password: hashedPassword });
  if (!user) throw new Error('User not created');

  return await user.save();
};

export const loginUser = async (username, password) => {
  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid Username or password');
  }

  return user;
};

export const logoutUser = async () => {};
