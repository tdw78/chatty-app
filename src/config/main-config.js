require("dotenv").config(); 
const path = require("path");
const viewsFolder = path.join(__dirname, "..", "views");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const session = require("express-session");
const flash = require("express-flash");

module.exports = {
  init(app, express){
    app.set("views", viewsFolder);
    app.set("view engine", "ejs");
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.use(session({
      secret: process.env.cookieSecret,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1.21e+9 }
   }));
   app.use(flash());

   app.use((req,res,next) => {
     res.locals.currentUser = req.user;
     next();
   })
    }
};