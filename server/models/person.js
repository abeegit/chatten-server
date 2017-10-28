"use strict";

const schema = require("./person.json");
const utility = require("./utility");
const jwt = require("jsonwebtoken");

module.exports = function(Person) {
  Person.validatesUniquenessOf("email", {
    message: "You have already registered"
  });
  Person.on("dataSourceAttached", () => {
    const create = Person.create;

    Person.create = (data, options, cb) => {
      let customCb = (err, data) => {
        if (err) {
          cb(err);
        }
        cb(null, { status: "success" });
      };

      let salt = utility.getSalt(data.password.length);
      let saltHashPassword = utility.getSaltHashPassword(data.password, salt);
      let person = {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: saltHashPassword,
        salt: salt
      };
      create.call(Person, person, customCb);
    };
  });

  Person.login = (email, password, cb) => {
    let cert = fs.readFileSync("./../keys/jwt.key");
    console.log(cert);
    Person.findOne(
      { fields: ["salt", "password"], where: { email: "afasfs" } },
      (err, person) => {
        if (err) {
          cb(err);
        }
        if (
          person &&
          utility.getSaltHashPassword(password, person.salt) === person.password
        ) {
          let token = jwt.sign({}, cert, { algorithm: "RS256" });
          cb(null, { status: "success", accessToken: "fskhasfks" });
        } else {
          cb({ statusCode: "400", status: "failure" });
        }
      }
    );
  };

  Person.remoteMethod("login", {
    accepts: [
      {
        arg: "email",
        description: "User email",
        required: true,
        type: "string"
      },
      {
        arg: "password",
        description: "User password",
        required: true,
        type: "string"
      }
    ],
    description: "Method to login the user using his/her email and password",
    http: { path: "/login", verb: "post", status: 200, errorStatus: 400 },
    returns: [
      { arg: "status", type: "string" },
      { arg: "accessToken", type: "string" }
    ]
  });
};
