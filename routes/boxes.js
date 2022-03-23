const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Box = require("../models/Box");

// @route   GET api/boxes
// @desc    Get all boxes
// @access  Private
router.get("/", async (req, res) => {
  try {
    const boxes = await Box.find();
    res.json(boxes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/boxes
// @desc    Add new box
// @access  Private
router.post(
  "/",
  [
    check("name", "name is required").notEmpty(),
    check("content", "theme is required").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, theme, content, dimensions, location } =
      req.body;
    try {
      const newBox = new Box({
        name,
        description,
        theme,
        content,
        dimensions,
        location,
      });

      const box = await newBox.save();

      res.json(box);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/contacts/:id
// @desc    Update box
// @access  Private
router.put("/:id", async (req, res) => {
  const { name, description, theme, content, dimensions, location } = req.body;

  const boxFields = {};
  if (name) boxFields.name = name;
  if (description) boxFields.description = description;
  if (theme) boxFields.theme = theme;
  if (content) boxFields.content = content;
  if (dimensions) boxFields.dimensions = dimensions;
  if (location) boxFields.location = location;

  try {
    let box = await Box.findById(req.params.id);
    if (!box) return res.status(404).json({ msg: "box not found" });

    box = await Box.findByIdAndUpdate(
      req.params.id,
      { $set: boxFields },
      { $new: true }
    );

    res.json(box);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/contacts/:name
// @desc    Delete box
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    let box = await Box.findById(req.params.id);
    if (!box) return res.status(404).json({ msg: "box not found" });

    await Box.findByIdAndDelete(req.params.id);

    res.json({ msg: "Box removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
