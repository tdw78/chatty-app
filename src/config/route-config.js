module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const userRoutes = require("../routes/users");
    const messageRoutes = require("../routes/messages");

    app.use(staticRoutes);
    app.use(userRoutes);
    app.use(messageRoutes);

  }
}