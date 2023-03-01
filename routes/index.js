var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Giang_vien", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

let giangvienSchema = mongoose.Schema({
  MaGV: {
    type: String,
  },
  HoTen: {
    type: String,
  },
  DiaChi: {
    type: String,
  },
  SDT: {
    type: String,
  },
});

let Giang_vien = mongoose.model("demos", giangvienSchema);

/* GET home page. */
router.get("/", function (req, res, next) {
  Giang_vien.find({}, (error, data) => {
    res.render("index", { giangviens: data });
  });
});

router.get("/form-add", function (req, res, next) {
  res.render("form-add", {});
});

router.post("/add", function (req, res, next) {
  Giang_vien.create(req.body);
  res.redirect("/");
});

router.get("/form-update/:id", function (req, res, next) {
  Giang_vien.findById(req.params.id, (error, data) => {
    res.render("form-update", { giangvien: data });
  });
});

router.post("/update", function (req, res, next) {
  Giang_vien.findByIdAndUpdate(req.body.id, req.body, (error, data) => {
    res.redirect("/");
  });
});

router.get("/form-delete/:id", function (req, res, next) {
  Giang_vien.findByIdAndDelete(req.params.id, (error, data) => {
    res.redirect("/");
  });
});

module.exports = router;
