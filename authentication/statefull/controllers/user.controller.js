import { loginUser, registerUser } from '../services/user.service.js';

export const signup = async (req, res) => {
  // Get userName and password from body
  const { username, password } = req.body;

  // Check if userName and password is provided or not
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username and password is required',
    });
  }

  try {
    const user = await registerUser(username, password);
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: user,
    });
  } catch (error) {
    console.log('Error creating new user', error);
    res.status(500).json({
      success: false,
      message: 'error signing up',
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  //   Check if userName and password is provided or not
  if (!username || !password)
    return res.status(400).json({ success: false, message: 'Username and password is required' });

  try {
    const user = await loginUser(username, password);

    // Save user id in session
    req.session.userId = user._id;

    res.status(200).json({
      success: true,
      message: 'Login Successfull',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'error Logging in',
      error: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    await req.session.destroy();
    res.status(200).json({
      success: true,
      message: 'Logout Successfull',
    });
  } catch (error) {
    console.log('Error logging out', error);
    res.status(500).json({
      success: false,
      message: 'error Logging out',
      error: error.message,
    });
  }
};
