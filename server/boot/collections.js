"use strict";

const person = require("../models/person.json");
const colors = require("colors");

module.exports = function(server) {
  let ds = server.dataSources.mongo;
  ds.autoupdate(person.name, function(err, result) {
    if (err) {
      console.log(
        `Error autoupdating collection ${person.name} ${err.toString()} `.red
      );
    } else {
      console.log(`Collections ${person.name} ready`.dim);
    }
  });
};
