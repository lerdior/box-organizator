const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.sendStatus(200);
});

router.post("/", (req, res) => {
    res.sendStatus(201);
});

router.put("/:id", (req, res) => {
    res.sendStatus(202);
});

router.delete("/:id", (req, res) => {
    res.sendStatus(203);
});

module.exports = router;