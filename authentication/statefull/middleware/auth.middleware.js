export const isLoggedIn = (req, res, next) => {
  if (req.session && req.session.userId) return next();
  return res.status(401).json({
    success: false,
    message: 'Unauthorized: Please log in first',
  });
};
