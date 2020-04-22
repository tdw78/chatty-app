const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;

describe("User", () => {

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

  describe("#create()", () => {
    it("should create a User", (done) => {
      User.create({
        name: "Barry",
        email: "bonds@giants.com",
        password: "homeruns"
      })
      .then((user) => {
        expect(user.email).toBe("bonds@giants.com");
        expect(user.id).toBe(1);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should not create a user with invalid or incomplete credentials", (done) => {
      User.create({
        name: "Jerry",
        email: "seinfeld",
        password: "kramer"
      })
      .then((user) => {
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Validation error: must be a valid email");
        done();
      });
    });

    it("should not create a user with an email already taken", (done) => {

      User.create({
        name: "Jerry",
        email: "seinfeld@mail.com",
        password: "comedy"
      })
      .then((user) => {

        User.create({
          name: "Larry",
          email: "seinfeld@mail.com",
          password: "1234abc"
        })
        .then((user) => {
          done();
        })
        .catch((err) => {
          expect(err.message).toContain("Validation error");
          done();
        });
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });

});