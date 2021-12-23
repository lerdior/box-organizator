const express = require("express");

const app = express();

app.get("/", (req, res) => res.json({ msg: "Hello and welcome..." }));

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/gifts", require("./routes/gifts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
