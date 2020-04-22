const messageQueries = require("../db/queries.messages.js");

module.exports = {

  index(req, res, next){
    messageQueries.getAll((err, messages) => {
      if(err){
        console.log(err)
        res.redirect(500, "/");
      } else {
        res.render("messages/index", {messages});
      }
    })
  },
  create(req, res, next){

    let newMessage = {
      text: req.body.text,
    };
    messageQueries.addMessage(newMessage, (err, message) => {
       if(err){
         res.redirect(500, "/");
       } else {
         res.redirect(303, '/messages');
       }
     });
    }

}