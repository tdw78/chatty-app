const userQueries = require("../db/queries.users.js");
const passport = require("passport");

module.exports = {
  signUp(req, res, next){
    res.render("users/signUp");
  },
  create(req, res, next){
         let newUser = {
           name: req.body.name,
           email: req.body.email,
           password: req.body.password,
           passwordConfirmation: req.body.passwordConfirmation
         };
         console.log(newUser) 
         userQueries.createUser(newUser, (err, user) => {
           if(err){
             req.flash("error", err);
             res.redirect("/users/sign_up");
           } else {

             passport.authenticate("local")(req, res, () => {
              req.flash("notice", "You've successfully signed in!");
              console.log("SUCCESS!!") 
              res.redirect("/");
             })
           }
         });
       },
       signInForm(req, res, next){
        res.render("users/signIn");
      },
      signIn(req, res, next){
        passport.authenticate("local")(req, res, function () {
          if(!req.user){
            req.flash("notice", "Sign in failed. Please try again.")
            res.redirect("/users/sign_in");
          } else {
            req.flash("notice", "You've successfully signed in!");
            res.redirect("/");
          }
        })
      },
      signOut(req, res, next){
        req.logout();
        req.flash("notice", "You've successfully signed out!");
        res.redirect("/");
      }
}