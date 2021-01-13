const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const model = require("../model/users");

passport.use(new LocalStrategy(
  async function(username, password, done) {

    const user = await model.checkCredential(username, password);

    if (!user) {
      return done(null, false, { message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
    }
console.log(user);
    if (user.role != 'khách hàng') {
      return done(null, false, { message: 'Đây không phải là tài khoản khách hàng' });
    }

    if (user.status != 'đang hoạt động') {
      return done(null, false, { message: 'Tài khoản của bạn chưa được kích hoạt' });
    }

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