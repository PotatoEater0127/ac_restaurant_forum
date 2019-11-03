// An utility to help access flash messages
module.exports = (successVar, errorVar) => {
  return (req, res, next) => {
    if (!req.flash) {
      throw Error("please set up flash before using flashHelper");
    }
    res.locals[successVar] = req.flash(successVar);
    res.locals[errorVar] = req.flash(errorVar);
    req.flashSuccess = message => req.flash(successVar, message);
    req.flashError = message => req.flash(errorVar, message);
    next();
  };
};
