const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("./models/user");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // Specify that the email field will be used as the username
    },
    async (email, password, done) => {
      try {
        // Find the user by email in the database
        const user = await User.findOne({ email });

        // If user not found, return error
        if (!user) {
          return done(null, false, { message: "Invalid email or password" });
        }

        // Compare the provided password with the hashed password stored in the database
        const isMatch = await bcrypt.compare(password, user.password);

        // If passwords match, return the user
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Invalid email or password" });
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
