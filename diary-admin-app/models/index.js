//Sequelize를 이용한 ORM 모델 정의 파일
const path = require("path");
const Sequelize = require("sequelize");

//개발 모드 환경설정
const env = process.env.NODE_ENV || "development";

//DB 연결 환경 설정 정보 변경 처리, 관련 정보 수정
const config = require(path.join(__dirname, "..", "config", "config.json"))[
  env
];

//데이터 베이스 객체
const db = {};

//DB 연결 정보로 시퀄라이즈 ORM 객체 생성
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

//DB 처리 객체에 시퀄라이즈 정보 맵핑 처리
db.sequelize = sequelize;
db.Sequelize = Sequelize;

//전체 모델 모듈 파일 참조하고 db 속성 정의
db.Admin = require("./admin.js")(sequelize, Sequelize);
db.Member = require("./member.js")(sequelize, Sequelize);

//db 객체 외부로 노출
module.exports = db;
