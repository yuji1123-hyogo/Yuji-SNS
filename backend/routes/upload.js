// const router = require("express").Router();
// const Image = require("../models/Image");
// const multer = require("multer");
// // const fs = require("fs");
// // const path = require("path");

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "public/images");
//     },
//     filename: (req, file, cb) => {
//       // req.body.nameが存在しない場合はfile.originalnameを使用
//       cb(null, req.body.name || file.originalname);
//     },
//   });

// const upload = multer({
//   storage: storage,
// });

// //画像アップロードAPI
// router.post("/", upload.single("file"), (req, res) => {
//     try {
//       return res.status(200).json("画像のアップロードに成功しました");
//     } catch (err) {
//       console.log(err);
//       return res.status(500).json("画像のアップロードに失敗しました");
//     }
//   });
// module.exports = router;
