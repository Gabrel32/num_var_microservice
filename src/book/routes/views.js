const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/:cap/:pag", (req, res) => {
  const { cap, pag } = req.params;
  res.sendFile(
    path.join(__dirname, `../views/${cap.slice(1)}/${pag.slice(1)}.ejs`)
  );
});

module.exports = router;
