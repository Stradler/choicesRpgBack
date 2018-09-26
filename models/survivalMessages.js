module.exports = (sequelize, type) => {
  return sequelize.define('survivalMessage', {
      // id: {
      //   type: type.INTEGER,
      //   primaryKey: true,
      //   autoIncrement: true
      // },
      message: type.STRING
  }, {
    tableName: "survivalMessage"
  })
}