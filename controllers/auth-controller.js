exports.register = (req, res, next) => {
  res.send("register route");
};

exports.login = (req, res, next) => {
  res.send("login route");
};

exports.forgotPassword = (req, res, next) => {
  res.send("forgot password route");
};

exports.resetPassword = (req, res, next) => {
  res.send("reset password route");
};
