const authenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/signin");
};

const authenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.id === Number(req.params.id)) {
      return next();
    }
    req.flashError("You are not authorized to access other user's profile ✌️");
    return res.redirect(`/users/${req.user.id}`);
  }

  return res.redirect("/signin");
};

const authenticatedAdmin = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.isAdmin) {
      return next();
    }
    return res.redirect("/");
  }
  return res.redirect("/signin");
};

module.exports = { authenticated, authenticatedUser, authenticatedAdmin };
