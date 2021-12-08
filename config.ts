// this is a glorified switch for setting enviroment specific stuff(look inside of enviroments/ )
module.exports = () => {
  console.log(process.env.ENVIROMENT);
  if (!process.env.ENVIROMENT) return false;
  if (process.env.ENVIROMENT == "development") {
    const development = require("./enviroments/development");
    return development;
  }

  if (process.env.ENVIROMENT == "production") {
    const production = require("./enviroments/production");
    return production;
  }
  return false;
};
