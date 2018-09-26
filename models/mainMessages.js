module.exports = (sequelize, type) => {
  return sequelize.define('mainMessage', {
    message: type.STRING
  }, {
    tableName: "mainMessage"
  });
}