import express from 'express';
import { Register, Login, Me, ValidateAuthor, LogOut, forgetPassword, resetPassword } from '../controllers/Auth.js';
import { isAdmin } from '../middleware/Auth.js';
import axios from 'axios';
import Users from '../models/UserModels.js';
import jwt from 'jsonwebtoken';
import argon2 from "argon2";
import { google } from "googleapis";

const router = express.Router();

const CLIENT_ID = 'YOUR_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const REDIRECT_URI = 'http://localhost:5000/auth/google/callback';

// Initiates the Google Login flow
router.get('/auth/google', (req, res) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
  res.redirect(url);
});

// Callback URL for handling the Google Login response
router.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ msg: "Authorization code not found" });
  }

  try {
    // Exchange authorization code for access token
    const response = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code',
    });

    const { access_token, id_token } = response.data;

    // Use access_token to fetch user profile
    const profileResponse = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const profile = profileResponse.data;

    if (profile) {
      let user = await Users.findOne({
        where: {
          email: profile.email
        }
      });

      if (!user) {
        const randomPassword = Math.random().toString(36).slice(-8);
        const hashPassword = await argon2.hash(randomPassword);

        user = await Users.create({
          username: profile.name,
          email: profile.email,
          password: hashPassword,
          role: 'user', // Default role
          status: 'active', // Default status
          isGoogleUser: true
        });
      }

      const accessToken = jwt.sign(
        { user_id: user.user_id, username: user.username, email: user.email, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
      );

      console.log("Access token generated:", accessToken);

      res.redirect(`http://localhost:5000/auth-success?token=${accessToken}`);
      // res.status(200).json({ msg: "Login successful" });

    } else {
      res.status(400).json({ msg: "Failed to retrieve user info from Google" });
    }
  } catch (error) {
    console.error("Error during Google login callback:", error.response ? error.response.data : error.message);
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
});

// Logout route
router.get('/logout', (req, res) => {
  // Code to handle user logout
  res.redirect('/login');
});

router.post("/register", Register);
router.post("/validate-author", ValidateAuthor);
router.post("/validate-author", isAdmin);
router.post('/login', Login);
router.get('/me', Me);
router.delete('/logout', LogOut);
router.post('/forget-password', forgetPassword);
router.post('/reset-password', resetPassword);
export default router;
// route controllers