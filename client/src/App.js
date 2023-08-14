import React, { useState, useEffect } from "react";
import "./App.css";
import Image1 from "./assets/tubebyte_cropped.png";
function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <div>
      <div className="Site">
        <img src={Image1} alt="" />
        <h1>Welcome!</h1>
        <div className="top">
          <form action="convert" method="POST" id="form">
            <div>
              <input type="text" name="videolink" placeholder="Video Link" />
              <button id="convert-button">Convert!</button>
            </div>
          </form>
        </div>
        {/* <div className="bottom">
          {success && typeof success !== undefined ? (
            <div className="if_works">
              <p>{songTitle}</p>
              <a href={songURL} target="_blank" rel="noopener noreferrer">
                <button id="download-button">Download</button>
              </a>
            </div>
          ) : !success ? (
              <div className="error"><p>{error_msg}</p></div>
          ) : (
            <div></div>
          )}
        </div> */}
      </div>
      <div className="App">
        <center>
          <h1>{message}</h1>
        </center>
      </div>
    </div>
  );
}

export default App;
