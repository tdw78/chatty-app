const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:5000/messages";
const sequelize = require("../../src/db/models/index").sequelize;
const Message = require("../../src/db/models").Message;
const User = require("../../src/db/models").User;


describe("routes : messages", () => {

  beforeEach((done) => {    
    this.message;
    this.user;

    sequelize.sync({ force: true }).then(() => {

      User.create({
        name: "Bob",
        email: "bob@mail.com",
        password: "124abc"
      })
      .then((user) => {
        this.user = user
      
      Message.create({
        text: "Hello everyone",
        userId: this.user.id
      })
      .then((res) => {
        this.message = res;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      })
    })
    });
  });

  describe("message functions", () => {

    describe("GET /messages", () => {

      it("should return all messages", (done) => {
        request.get(base, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Hello everyone");
          done();
        });
      });
    });

    describe("POST /messages", () => {
      const options = {
        url: `${base}`,
        form: {
          text: "How are you?",
          userId: this.user.id
        }
      }

      it("should create a new message", (done) => {
        request.post(options,
          (err, res, body) => {
            Message.findOne({where: {text: "How are you?"}})
            .then((message) => {
              expect(message.text).toBe("How are you?");
              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            });
          }
        );
      });
    });

  });

});
