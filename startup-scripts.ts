const config = require("./config");

const init = () => {
  return new Promise((resolve: Function, reject: Function) => {
    const settings = config();
    // Do stuff with config here like set up the database connection n that kind of thing
    resolve(settings);
  });
};

module.exports = init;
