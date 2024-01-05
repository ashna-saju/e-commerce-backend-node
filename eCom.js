const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON in the request body
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Handling a GET request to the root endpoint
app.get("/", (req, res) => {
  const { name, age } = req.query;

  // Check if both name and age are provided in the query parameters
  if (name && age) {
    res.send(`Welcome, ${name}! You are ${age} years old.`);
  } else {
    res.send("Welcome...");
  }
});

// Handling a POST request to the /contact endpoint
app.post("/contact", (req, res) => {
  const { name, age } = req.body;

  if (!name) {
    res.status(500).json({ error: "Name is required in the request body." });
  } else {
    // Check if both name and age are provided in the request body
    if (name && age) {
      res.status(200).json({ message: `Welcome, ${name}! You are ${age} years old.` });
    } else {
      res.status(400).json({ error: "Age is required in the request body." });
    }
  }
});
