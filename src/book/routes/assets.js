const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/:cap/:asset", (req, res) => {
  const { cap, asset } = req.params;
  res.sendFile(
    path.join(__dirname, `../assets/${cap.slice(1)}/${asset.slice(1)}`)
  );
});

module.exports = router;
