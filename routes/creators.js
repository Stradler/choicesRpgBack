const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
  res.render("index");
});

router.get("/main", (req, res)=>{
  res.render("main")
});

router.get("/survival",  (req, res) =>{
  res.render("survival")
});

module.exports = router;