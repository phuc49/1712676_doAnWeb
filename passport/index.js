const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const model = require("../model/users");

passport.use(new LocalStrategy(
  async function(username, password, done) {

    const user = await model.checkCredential(username, password);

    if (!user) {
      return done(null, false, { message: 'Incorrect username or password' });
    }

    // if (user.role != 'khách hàng') {
    //   return done(null, false, { message: 'You are not a customer' });
    // }

    return done(null, user);

  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  model.getUser(id).then((user) => {
    done(null, user[0]);
  });
});

module.exports = passport;