const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.sendStatus(200);
});

router.post("/", (req, res) => {
  res.sendStatus(201);
});

module.exports = router;
