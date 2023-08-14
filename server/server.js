const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get("/message", (req, res) => {
  res.send("Hello World");
});

app.post("/convert", async (req, res) => {
  const videolink = req.body.videolink;
  console.log(videolink);
  res.json({ success: true, message: "Conversion successful" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});