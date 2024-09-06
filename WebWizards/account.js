const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware setup
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:5500/auth/callback'
},
(accessToken, refreshToken, profile, done) => {
  // In a real app, you would save the user profile to a database
  console.log('Profile received:', profile); // Debugging line
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'account.html'));
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/profile');
});

app.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.json(req.user);
});

// Start server
app.listen(5500, () => {
  console.log('Server started on http://localhost:5500');
});




const links = document.querySelectorAll(".link");
const forms = document.querySelector(".forms");
const showHide = document.querySelectorAll(".hide-show");

showHide.forEach(showicon=>{
    showicon.addEventListener("click", ()=>{
        let field_password = showicon.parentElement.parentElement.querySelectorAll(".password");

        field_password.forEach(password=>{
            if(password.type === 'password'){
                password.type = 'text';
                showHide.classList.replace("bx-hide", "bx-show");
            }
            password.type = "password";
            showHide.classList.replace("bx-show", "bx-hide");
        })
    })
})


links.forEach(link =>{
    link.addEventListener("click", e=>{
        e.preventDefault();
        forms.classList.toggle("Show-Signup");
    })
})