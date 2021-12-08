import * as COMMON from "./common";
var BASE_PATH = process.env.PROD_BASE_PATH;

var DATABASE_CONNECTION_STRING = process.env.PROD_DB_CON_STRING;

module.exports = {
  common: { ...COMMON },
  base_path: BASE_PATH,
  database_connection_string: DATABASE_CONNECTION_STRING,
};
