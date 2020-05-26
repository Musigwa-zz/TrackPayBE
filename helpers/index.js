const models = require("../models");
const { PORT } = require("../constants");
/**
 * @description This is a class of static helper methods to perform some logics
 * @author MUSIGWA Pacifique
 * @class Helpers
 */
class Helpers {
  /**
   * @description This helps verifying the database connection
   * @author MUSIGWA Pacifique
   * @static
   * @return {void}
   * @memberof Helpers
   */
  static async dbConnect() {
    const { sequelize } = models;
    try {
      await sequelize.authenticate();
      console.log(`Listening on port ${PORT}`);
      console.log("DB connection established");
    } catch (error) {
      console.error(error.message, error);
      process.exit(1);
    }
  }
}

module.exports = Helpers;
