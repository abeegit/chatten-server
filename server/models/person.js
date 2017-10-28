"use strict";

const schema = require("./person.json");
const utility = require("./utility");

module.exports = function(Person) {
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
};
