const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const User = require('../models/User');

module.exports = function configurePassport(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ googleId: profile.id });

          if (!user) {
            const email = profile.emails && profile.emails[0] ? profile.emails[0].value : undefined;

            try {
              user = await User.create({
                googleId: profile.id,
                displayName: profile.displayName,
                email,
              });
            } catch (error) {
              if (error.code !== 11000) {
                throw error;
              }

              user = await User.findOne({ googleId: profile.id });
            }
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (userId, done) => {
    try {
      const user = await User.findById(userId);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};
