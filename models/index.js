const js = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const SurvivalModel = require("./survival");
const SurvivalAnswersModel = require("./survivalAnswers");
const SurvivalMessagesModel = require("./survivalMessages");
const Survival = SurvivalModel(sequelize, Sequelize);
const SurvivalAnswer = SurvivalAnswersModel(sequelize, Sequelize);
const SurvivalMessage = SurvivalMessagesModel(sequelize, Sequelize);

Survival.hasMany(SurvivalAnswer);
SurvivalAnswer.belongsTo(Survival);
SurvivalMessage.hasOne(SurvivalAnswer);

sequelize.sync({force: true})
  .then(() => {
    console.log(`Database & tables created!`)
  })
  .error(err => console.log(err));

module.exports = {
  Survival,
  SurvivalAnswer,
  SurvivalMessage
}
