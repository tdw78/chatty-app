const Message = require("./models").Message;

module.exports = {
 
  getAll(callback){
   return Message.findAll()
    .then((messages) => {
       callback(null, messages);
    })
    .catch((err) => {
      callback(err)
    })
  },
  addMessage(newMessage, callback){
    return Message.create({
      text: newMessage.text
    })
    .then((message) => {
      callback(null, message);
    })
    .catch((err) => {
      callback(err);
    })
  }
}