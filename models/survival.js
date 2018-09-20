module.exports = (sequelize, type) => {
  return sequelize.define('survival', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name : type.STRING,
      effect: type.STRING,
      difficulty: type.STRING
  }, {
    tableName: "survival",
    timestamps: false
  })
}