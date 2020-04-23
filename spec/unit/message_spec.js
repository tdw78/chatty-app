const sequelize = require("../../src/db/models/index").sequelize;
const Message = require("../../src/db/models").Mesage;
const User = require("../../src/db/models").User;

describe("Message", () => {
  beforeEach(done => {
    this.message;
    this.user;

    sequelize.sync({ force: true }).then(res => {
      User.create({
        name: "Tim",
        email: "tim@mail.com",
        password: "golfer"
      }).then(user => {
        this.user = user;

        Message.create({
            text: "Keep you head down",
            userId: this.user.id
          })
          .then(message => {
          this.message = message;
          done();
        });
      });
    });
  });

  describe("#create()", () => {
    it("should create a new messge", done => {
      Message.create({
        text: "How r u",
        userId: this.user.id
      })
        .then(messge => {
          expect(message.text).toBe("How r u");
          done();
        })
        .catch(err => {
          done();
        });
    });
  });

});