import {googleConfig} from "../../config/config";
import express from 'express';
const router = require('express').Router();
import passport from "passport/lib/index"
import GoogleStrategy from "passport-google-oauth20/lib/index";

const googleAuth = require('google-auth-library');
const app = express();

const transformGoogleProfile = (profile) => ({
  name: profile.displayName,
  avatar: profile.image.url,
});

passport.use(new GoogleStrategy(googleConfig,
  async (accessToken, refreshToken, profile, done) => done(null, transformGoogleProfile(profile._json))
));

passport.serializeUser((user, done) => done(null, user));

passport.deserializeUser((user, done) => done(null, user));

router.use(passport.initialize());
router.use(passport.session());

router.get('/hello', (req, resp) => {
  resp.send("Hello world");
});
router.get('/google', passport.authenticate('google', {scope: googleConfig.SCOPES}));

router.get('/google/callback',
  passport.authenticate('google', {failureRedirect: '/auth/google'}),
  (req, res) => {
    let user = req.user;
    let auth = new googleAuth();
    const oauth2Client = new auth.OAuth2(googleConfig.clientID, googleConfig.clientSecret, googleConfig.callbackURL);

    Promise.all(oauth2Client.getToken(req.query.code, (err, tokens) => {
      if (!err) {
        oauth2Client.credentials = tokens;
        user.tokens = tokens;
        // listMessages(oauth2Client);
      }
      else {
        console.log(err);
      }
    })).then(res.redirect('EnvoiceHelper://login?user=' + JSON.stringify(user)));
  }
);

module.exports = router;