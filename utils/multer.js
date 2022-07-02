const multer = require("multer");
const path = require("path");
// Multer config
module.exports = multer({
  storage: multer.diskStorage({dest: "uploads/"}),
  // destination: function (req, file, cb) {

  //   cb(null, "/uploads")
  // },

  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".jfif") {
      cb(new Error("Unsupported file type!"), false);
      return;
    }
    cb(null, true);
  },
});