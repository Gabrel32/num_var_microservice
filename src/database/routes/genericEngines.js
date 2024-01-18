const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/:genericEngines", (req, res) => {
          const {genericEngines} = req.params;
          res.sendFile(
                    path.join(
                              __dirname,
                              `../engines/genericEngines/${genericEngines.slice(
                                        1
                              )}`
                    )
          );
});

module.exports = router;
