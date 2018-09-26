module.exports = (sequelize, type) => {
  return sequelize.define('reward', {
      // id: {
      //   type: type.INTEGER,
      //   primaryKey: true,
      //   autoIncrement: true
      // },
      reward_name: type.STRING,
      effect: type.STRING,
      power: type.INTEGER
  }, {
    tableName: "reward"
  })
}