// cookieGenerator.js

import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '15d',
  });

  res.cookie('authToken', token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in ms
    httpOnly: true, // Prevents access to cookie from client-side JavaScript
    sameSite: 'strict', // Protects against CSRF attacks
    secure: process.env.NODE_ENV === 'production', 
  });
};
