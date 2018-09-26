var express = require("express");
var router = express.Router();
const DB = require("../models");

router.get("/survival", (req, res) => {
  DB.Survival.findAll({
    where: {
      age: req.query.age
    },
    include: [
      {
        model: DB.SurvivalAnswer,
        as: "answers",
        include: [{
          model: DB.SurvivalMessage,
        }]
      }
    ]
  }).then(project => res.json((project || {message: "cannot find!"})))
  .catch(err => res.json(err));
});

router.get("/main", (req, res) => {
  DB.Main.findAll({
    include: [
      {
        model: DB.MainAnswer,
        as: "answers",
        include: [{
          model: DB.MainMessage
        }, {
          model: DB.MainReward
        }]
      }
    ]
  }).then(project => res.json((project || {message: "cannot find!"})))
  .catch(err => res.json(err));
});

router.post("/survival", (req, res) => {
  DB.Survival.create({
    name: req.body.name,
    effect: req.body.effect,
    age: req.body.age
  })
    .then(survEvent => {
      DB.SurvivalAnswer.create(
        {
          survivalId: survEvent.get("id"),
          answer_name: req.body.firstAnswer,
          power: req.body.firstPower,
          survivalMessage: {
            message: req.body.firstMessage
          }
        },
        {
          include: DB.SurvivalAnswer.Message
        }
      );

      DB.SurvivalAnswer.create(
        {
          survivalId: survEvent.get("id"),
          answer_name: req.body.secondAnswer,
          power: req.body.secondPower,
          survivalMessage: {
            message: req.body.secondMessage
          }
        },
        {
          include: DB.SurvivalAnswer.Message
        }
      );
    })
    .then(() => res.json({ message: "ok" }))
    .catch(err => console.log(err));
});

router.post("/main", (req, res) => {
  DB.Main.create({
    name: req.body.name
  })
    .then(mainEvnet => {
      DB.MainAnswer.create(
        {
          mainId: mainEvnet.get("id"),
          answer_name: req.body.firstAnswer,
          mainMessage: {
            message: req.body.firstMessage
          },
          reward: {
            reward_name: req.body.firstRewardName,
            effect: req.body.firstRewardEffect,
            power: req.body.firstRewardPower
          }
        },
        {
          include: [DB.MainAnswer.Message, DB.MainAnswer.Reward]
        }
      );

      DB.MainAnswer.create(
        {
          mainId: mainEvnet.get("id"),
          answer_name: req.body.secondAnswer,
          mainMessage: {
            message: req.body.secondMessage
          },
          reward: {
            reward_name: req.body.secondRewardName,
            effect: req.body.secondRewardEffect,
            power: req.body.secondRewardPower
          }
        },
        {
          include: [DB.MainAnswer.Message, DB.MainAnswer.Reward]
        }
      );
    })
    .then(() => res.json({ message: "ok" }))
    .catch(err => console.log(err));
});

module.exports = router;
