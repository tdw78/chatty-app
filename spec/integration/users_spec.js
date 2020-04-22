const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:5000/users/";
const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models/index").sequelize;
const Message = require("../../src/db/models").Message;


describe("routes : users", () => {

  beforeEach((done) => {

    sequelize.sync({force: true})
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log(err);
      done();
    });
  });

  describe("GET /users/sign_up", () => {

    it("should render the sign up form", (done) => {
      request.get(`${base}sign_up`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Create an Account");
        done();
      });
    });

  });
  describe("POST /users", () => {

        it("should create a new user account", (done) => {
          const options = {
            url: base,
            form: {
              email: "mickey@mail.com",
              password: "yankees"
            }
          }
    
          request.post(options,
            (err, res, body) => {
    
              User.findOne({where: {email: "mickey@mail.com"}})
              .then((user) => {
                expect(user.email).toBe("mickey@mail.com");
                expect(user.id).toBe(1);
                done();
              })
              .catch((err) => {
                console.log(err);
                done();
              });
            }
          );
        });
    
        it("should not create a new user with invalid or incomplete credentials", (done) => {
          request.post(
            {
              url: base,
              form: {
                email: "mickey",
                password: "1234abc"
              }
            },
            (err, res, body) => {
              User.findOne({where: {email: "mickey"}})
              .then((user) => {
                expect(user).toBeNull();
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
      describe("GET /users/sign_in", () => {

        it("should render the sign-in form", (done) => {
          request.get(`${base}sign_in`, (err, res, body) => {
            expect(err).toBeNull();
            expect(body).toContain("Sign in");
            done();
          });
        });
   
      });
 
});