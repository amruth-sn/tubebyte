import React, { useState} from "react";
import "./App.css";
import Image1 from "./assets/tubebyte_cropped.png";
function App() {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [songURL, setSongURL] = useState("");
  const [songTitle, setSongTitle] = useState("");

  // useEffect(() => {
  //   fetch("/message")
  //     .then((res) => res.json())
  //     .then((data) => setMessage(data.message));
  // }, []);
  // useEffect(() => {
  //   fetch("/convert")
  //     .then((res) => res.json())
  //     .then((data) => setMessage(data.message));
  // }, []);
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/convert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ videolink: videoLink }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
        setSuccess(data.success);
        setSongURL(data.songURL);
        setSongTitle(data.songTitle);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  
  return (
    <div>
      <div className="Site">
        <img src={Image1} alt="" />
        <h1 className="header">
          Welcome! Enter a YouTube link to get started.
        </h1>
        <div className="top">
          <form
            onSubmit={handleSubmit}
            action="convert"
            method="POST"
            id="form"
          >
            <div>
              <input
                className="textbox"
                type="text"
                onChange={(e) => setVideoLink(e.target.value)}
                value={videoLink}
                name="videolink"
                placeholder=" Video Link"
                autoComplete="off"
              ></input>
              <button className="button" id="convert-button">
                Convert!
              </button>
            </div>
          </form>
          <br></br>
          <div>
            <h1 className="mid-header">
              Click the download link when it appears.{" "}
            </h1>
          </div>
        </div>
        <div className="App">
          <center>
            {!success && (
              <h1 className="mid-header">
                <p>{message}</p>
              </h1>
            )}
            {success && (
              <h1 className="bottom-header">
                <p>Conversion Result:</p>
                <p>{songTitle}</p>
                <a href={songURL} target="_blank" rel="noopener noreferrer">
                  <button className="button" id="download-button">
                    Download
                  </button>
                </a>
                <br></br>
                <div className="extras">
                  <p>
                    After clicking the download link, you will be taken to
                    another page. Please ignore the ads and click the dark blue
                    'Download' button. The site is 100% safe and you will not
                    encounter any malware. Let me know if you have any
                    questions!   
                    <a className="link"
                      href="https://www.amruthn.com/"
                      target="_blank"
                      rel="noreferrer"
                    >
                       Contact me
                    </a>
                  </p>
                </div>
              </h1>
            )}
          </center>
        </div>
      </div>
    </div>
  );
}

export default App;
