const authenticatedAdmin = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.isAdmin) {
      return next();
    }
    return res.redirect("/");
  }
  return res.redirect("/signin");
};

const authenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/signin");
};

module.exports = { authenticatedAdmin, authenticated };
