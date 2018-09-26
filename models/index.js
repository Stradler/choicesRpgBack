const js = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const SurvivalModel = require("./survival");
const SurvivalAnswersModel = require("./survivalAnswers");
const SurvivalMessagesModel = require("./survivalMessages");

const MainModel = require("./main");
const MainAnswersModel = require("./mainAnswers");
const MainMessagesModel = require("./mainMessages");
const MainRewardsModel = require("./rewards");

const Survival = SurvivalModel(sequelize, Sequelize);
const SurvivalAnswer = SurvivalAnswersModel(sequelize, Sequelize);
const SurvivalMessage = SurvivalMessagesModel(sequelize, Sequelize);

const Main = MainModel(sequelize, Sequelize);
const MainAnswer = MainAnswersModel(sequelize, Sequelize);
const MainMessage = MainMessagesModel(sequelize, Sequelize);
const MainReward = MainRewardsModel(sequelize, Sequelize);

Survival.Answers = Survival.hasMany(SurvivalAnswer, {as: "answers"});
SurvivalAnswer.Event = SurvivalAnswer.belongsTo(Survival);
SurvivalAnswer.Message = SurvivalAnswer.belongsTo(SurvivalMessage);

Main.Answers = Main.hasMany(MainAnswer, {as: "answers"});
MainAnswer.Event = MainAnswer.belongsTo(Main);
MainAnswer.Message = MainAnswer.belongsTo(MainMessage);
MainAnswer.Reward = MainAnswer.belongsTo(MainReward);


sequelize.sync({force: true})
  .then(() => {
    console.log(`Database & tables created!`)
  })
  .error(err => console.log(err));

module.exports = {
  Survival,
  SurvivalAnswer,
  SurvivalMessage,
  Main,
  MainAnswer,
  MainMessage,
  MainReward
}
