module.exports = (sequelize, type) => {
  return sequelize.define('survivalAnswer', {
      // id: {
      //   type: type.INTEGER,
      //   primaryKey: true,
      //   autoIncrement: true
      // },
      answer_name: type.STRING,
      power: type.INTEGER
  }, {
    tableName: "survivalAnswer"
  })
}