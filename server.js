const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files (HTML, CSS, JS, assets)
app.use(express.static(__dirname));

// Endpoint to get all drawings
app.get("/drawings", (req, res) => {
  const drawingsDir = path.join(__dirname, "assets/drawings");

  fs.readdir(drawingsDir, (err, files) => {
    if (err) return res.status(500).json({ error: "Cannot read folder" });

    // Filter only image files
    const images = files.filter(f => /\.(png|jpe?g|gif|webp)$/i.test(f))
                        .map(f => `/assets/drawings/${f}`);
    res.json(images);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});