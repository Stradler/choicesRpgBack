module.exports = (sequelize, type) => {
  return sequelize.define('mainAnswer', {
      // id: {
      //   type: type.INTEGER,
      //   primaryKey: true,
      //   autoIncrement: true
      // },
      answer_name: type.STRING
  }, {
    tableName: "mainAnswer"
  })
}