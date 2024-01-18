const { log } = require("console");
const express = require("express");
const router = express.Router();
const path = require("path");

//ruta dinamica de estilos
router.get("/css/:cap/:styleDocument", (req, res) => {
   const { styleDocument, cap } = req.params
   res.sendFile(path.join(__dirname, `../libraries/css/${cap}/${styleDocument}.css`));
});


router.get("/jsx", (req, res) => {
   res.sendFile(path.join(__dirname, "../libraries/jsxgraphcore.js"));
});
router.get("/jsxcss", (req, res) => {
   res.sendFile(path.join(__dirname, "../libraries/jsxgraph.css"));
});
router.get("/styles", (req, res) => {
   res.sendFile(path.join(__dirname, "../libraries/styles.css"));
});
router.get("/generalStylesFragata", (req, res) => {
   res.sendFile(path.join(__dirname, "../libraries/generalStylesFragata.css"));
});
router.get("/ownerStyles", (req, res) => {
   res.sendFile(path.join(__dirname, "../libraries/ownerStyles.css"));
});
router.get("/jspdf", (req, res) => {
   res.sendFile(path.join(__dirname, "../libraries/jspdf.min.js"));
});
router.get("/html2canvas", (req, res) => {
   res.sendFile(path.join(__dirname, "../libraries/html2canvas.min.js"));
});
router.get("/mathlive", (req, res) => {
   res.sendFile(path.join(__dirname, "../libraries/mathLive.js"));
});
router.get("/computeEngine", (req, res) => {
   res.sendFile(path.join(__dirname, "../libraries/computeEngine.js"));
});
module.exports = router;
