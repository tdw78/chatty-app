const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:5000/messages/";
const sequelize = require("../../src/db/models/index").sequelize;
const Message = require("../../src/db/models").Message;
const User = require("../../src/db/models").User;


describe("routes : messages", () => {

  beforeEach((done) => {    
    this.message;

    sequelize.sync({ force: true }).then(() => {
      Messge.create({
        text: "Hello everyone"
      })
      .then((res) => {
        this.message = res;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
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

    describe("POST /messages/create", () => {
      const options = {
        url: `${base}create`,
        form: {
          text: "How are you?"
        }
      }

      it("should create a new message", (done) => {
        request.post(options,
          (err, res, body) => {
            Message.findOne({where: {text: "How are you?"}})
            .then((message) => {
              expect(message).not.toBeNull();
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
