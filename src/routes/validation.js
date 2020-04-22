const { check, validationResult } = require('express-validator');

module.exports = {
  // validateMessages(req, res, next) {

  //   if(req.method === "POST") {
  //     req.check("text", "must be at least 1 characters in length").isLength({min: 1});
  //   }

  //   const errors = req.validationErrors();

  //   if (errors) {
  //     req.flash("error", errors);
  //     return res.redirect(303, req.headers.referer)
  //   } else {
  //     return next();
  //   }
  // },
  validateUsers(req, res, next) {
    if(req.method === "POST") {

      check("email", "must be valid").isEmail();
      check("password", "must be at least 6 characters in length").isLength({min: 6})
      check("passwordConfirmation", "must match password provided").optional().matches(req.body.password);
    }

    const errors = validationResult(req);
    
    if (errors) {
      req.flash("error", errors);
      return res.redirect(req.headers.referer);
    } else {
      return next();
    }
  }
}