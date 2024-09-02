//사용자 계정 관리 라우터
var express = require("express");
var router = express.Router();

router.get("/list", async (req, res, next) => {
  res.render("member/list");
});

router.get("/create", async (req, res, next) => {
  res.render("member/create");
});

router.get("/modify", async (req, res, next) => {
  res.render("member/modify");
});

module.exports = router;
