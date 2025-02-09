import React, { useState } from "react";
import "./style.css";

const SpamDetector = () => {
  const [message, setMessage] = useState("");
  const [prediction, setPrediction] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });
    const data = await response.json();
    setPrediction(data.prediction);
  };

  return (
    <div className="login">
      <h1>Spam⚠️ Detector</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          name="message"
          rows="6"
          cols="50"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <br />
        <button type="submit" className="btn btn-primary btn-block btn-large">
          Predict
        </button>
        <div className="results">
          {prediction !== null && (
            <h2 style={{ color: prediction === 1 ? "red" : "green" }}>
              {prediction === 1 ? "Looking Spam⚠️, Be safe" : "Not a Spam💚"}
            </h2>
          )}
        </div>
      </form>
    </div>
  );
};

export default SpamDetector;
