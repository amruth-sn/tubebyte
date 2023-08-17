const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path')
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "/build")));
app.use(express.urlencoded({ extended: true }));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/build", "index.html"));
});

app.post("/convert", async (req, res) => {
  let videolink = req.body.videolink;
  if (videolink === "" || videolink === null || videolink === undefined || !videolink.includes("youtube.com")) {
    res.json({ success: false, message : "Please enter valid video link "})
  }
  else {
    const parts = videolink.split("=");
    videolink = parts[1];
    // console.log("Received videolink in backend:", videolink);
    // res.json({ success: true, message: `Conversion successful --> ${videolink}` });
    const fetchAPI = await fetch(
      `https://youtube-mp3-download1.p.rapidapi.com/dl?id=${videolink}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": process.env.API_KEY,
        "x-rapidapi-host": process.env.API_HOST
      }
    });

    const fetchResponse = await fetchAPI.json();

    if (fetchResponse.status === "ok") {
      return res.json({ success: true, songTitle: fetchResponse.title, songURL: fetchResponse.link});
    }
    else {
      return res.json({ success: false, message: fetchResponse.msg});
    }
  }
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});