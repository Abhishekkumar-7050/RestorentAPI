const Person = require('./models/Person');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
    new LocalStrategy(async (USERNAME, password, done) => {
      // sequence shuld be same
      try {
        // console.log("Received credential", USERNAME, password);
        const user = await Person.findOne({ username: USERNAME });
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        // const isPasswordMatch = user.password === password ? true : false;
      const isPasswordMatch = await user.comparePassword(password);
        if (isPasswordMatch) {
          return done(null, user);
        } // let suppose password match nahi akrta hai
        else {
          return done(null, false, { message: "incorrect password" });
        }
      } catch (error) {
        return done(error);
      }
    })
  );
  module.exports = passport