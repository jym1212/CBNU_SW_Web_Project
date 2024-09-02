//관리자 계정 관리 라우터
var express = require("express");
var router = express.Router();

//날짜 및 시간 관련 모듈 참조
var moment = require("moment");

//ORM DB 객체 참조
var db = require("../models/index.js");

//동적 SQL 쿼리를 전달하기 위한 참조
var sequelize = db.sequelize;
const { QueryTypes } = sequelize;

//관리자 계정 목록 조회 라우팅 메소드
//호출 주소 : http://localhost:3000/admin/list
router.get("/list", async (req, res, next) => {
  const admins = await db.Admin.findAll();

  res.render("admin/list", { moment, admins });
});

//관리자 계정 등록 조회 라우팅 메소드
//호출 주소 : http://localhost:3000/admin/create
router.get("/create", async (req, res, next) => {
  res.render("admin/create");
});

//관리자 계정 등록 처리 라우팅 메소드
//호출 주소 : http://localhost:3000/admin/create
router.post("/create", async (req, res, next) => {
  const admin_id = req.body.admin_id;
  const admin_password = req.body.admin_password;
  const company_code = req.body.company_code;
  const dept_name = req.body.dept_name;
  const admin_name = req.body.admin_name;
  const email = req.body.email;
  const telephone = req.body.telephone;
  const used_yn_code = req.body.used_yn_code;

  const admin = {
    admin_id,
    admin_password,
    company_code,
    dept_name,
    admin_name,
    email,
    telephone,
    used_yn_code,
    reg_date: Date.now(),
    reg_member_id: 1,
  };

  const registedAdmin = await db.Admin.create(admin);

  res.redirect("/admin/list");
});

//관리자 계정 삭제 처리 라우팅 메소드
//호출 주소 : http://localhost:3000/admin/delete?id=1
router.get("/delete", async (req, res, next) => {
  const adminIdx = req.query.id;

  const deletedAdmin = await db.Admin.destroy({
    where: { admin_member_id: adminIdx },
  });

  res.redirect("/admin/list");
});

//관리자 계정 수정 처리 라우팅 메소드
//호출 주소 : http://localhost:3000/admin/modify/1
router.post("/modify", async (req, res, next) => {
  const adminIdx = req.body.admin_member_id;

  const admin_password = req.body.admin_password;
  const company_code = req.body.company_code;
  const dept_name = req.body.dept_name;
  const admin_name = req.body.admin_name;
  const email = req.body.email;
  const telephone = req.body.telephone;
  const used_yn_code = req.body.used_yn_code;

  const admin = {
    admin_password,
    company_code,
    dept_name,
    admin_name,
    email,
    telephone,
    used_yn_code,
    edit_date: Date.now(),
    edit_member_id: 1,
  };

  const modifiedAdmin = await db.Admin.update(admin, {
    where: { admin_member_id: adminIdx },
  });

  res.redirect("/admin/list");
});

//관리자 계정 수정 조회 라우팅 메소드
//호출 주소 : http://localhost:3000/admin/modify/1
router.get("/modify/:id", async (req, res, next) => {
  const adminIdx = req.params.id;

  const admin = await db.Admin.findOne({
    where: { admin_member_id: adminIdx },
  });

  res.render("admin/modify", { admin });
});

module.exports = router;
