const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const env = require('dotenv').config();

console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);

function setupGoogleAuth(app) {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    console.error('Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET environment variable');
    process.exit(1);
  }

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // Here you would typically save or find the user in your database
    process.nextTick(function() {
      return done(null, profile);
    });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  // Auth routes
  app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

  app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    });

  // Check authentication status
  app.get('/check-auth', (req, res) => {
    if (req.isAuthenticated()) {
      res.json({
        authenticated: true,
        user: req.user
      });
    } else {
      res.json({
        authenticated: false
      });
    }
  });

  // Logout route
  app.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });
}

module.exports = setupGoogleAuth;