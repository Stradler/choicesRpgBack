module.exports = (sequelize, type) => {
  return sequelize.define('main', {
      // id: {
      //   type: type.INTEGER,
      //   primaryKey: true,
      //   autoIncrement: true
      // },
      name : type.STRING,
  }, {
    tableName: "main"
  })
}