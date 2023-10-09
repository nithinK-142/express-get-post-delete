const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8000;

const data = {
  // Test Data
  Home: "Lander",
  Billy: "Butcher",
  Harry: "Potter",
  Darth: "Vader",
  Sherlock: "Holmes",
};

app.use(bodyParser.json());

// GET
app.get("/api/data/:key", (req, res) => {
  const key = req.params.key;
  if (data[key]) {
    res.json({ [key]: data[key] });
  } else {
    res.status(404).json({ error: "Key not found" });
  }
});

// POST
app.post("/api/data/:key", (req, res) => {
  const key = req.params.key;
  if (data[key]) {
    res.status(400).json({ error: "Key already exists" });
  } else {
    data[key] = req.body.value;
    res.json({ message: "Data added successfully" });
  }
});

// DELETE
app.delete("/api/data/:key", (req, res) => {
  const key = req.params.key;
  if (data[key]) {
    delete data[key];
    res.json({ message: "Data deleted successfully" });
  } else {
    res.status(404).json({ error: "Key not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
