import "./App.css";
import pixelImage from "./pixel.gif";
import React, { useState } from "react";

function App() {
  const [target, setTarget] = useState("");
  const [coinDenominations, setCoinDenominations] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const coinList = coinDenominations.split(",").map(Number);

    try {
      const apiUrl = process.env.REACT_APP_BACKEND_API_URL;
      const url = new URL(`${apiUrl}/coinChange`);

      url.searchParams.append("target", target);
      coinList.forEach((coin) =>
        url.searchParams.append("coinDenominations", coin)
      );

      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData);
      }

      const data = await response.json();
      setResult(data);
      setError("");
    } catch (e) {
      setError(e.message);
      setResult(null);
    }
  };

  /**
   * Displaying the result in a more readable format
   * Reason: For example, Target = 10,000 and Coin Denominations = [0.01]
   * This means we get a result containing 1,000,000 counts of $0.01 coins ([0.01, 0.01, 0.01....])
   * If we just display the raw result array obtained from backend, for large counts, it will be hard to read and display in the UI
   * Hence, we format the result in another more readable format to display the count of each unique coin
   */
  const beautifyResult = (result) => {
    let coinCount = {};

    result.forEach((coin) => {
      let coinStr = coin.toFixed(2);
      coinCount[coinStr] = (coinCount[coinStr] || 0) + 1;
    });

    let formattedResult = [];
    for (let coin in coinCount) {
      formattedResult.push(`$${coin} coin X ${coinCount[coin]}`);
    }

    return formattedResult.join(", ");
  };

  return (
    <div className="App">
      <h1 className="header">
        <img src={pixelImage} alt="pixel coin" width="96px" height="96px" />
        &nbsp; Coin Change Calculator
      </h1>
      <form onSubmit={handleSubmit} className="formContainer">
        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="Target Amount"
          className="input"
          required
        />
        <br />
        <br />
        <input
          type="text"
          value={coinDenominations}
          onChange={(e) => setCoinDenominations(e.target.value)}
          placeholder="Coin Denominations (comma separated)"
          className="input"
          required
        />
        <br />
        <br />
        <button type="submit" className="calculateBtn">
          Calculate
        </button>
      </form>

      {result && (
        <div>
          <h2>Result:</h2>
          <p>{beautifyResult(result)}</p>
        </div>
      )}
      {error && (
        <div style={{ color: "red" }}>
          <h2>Error:</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default App;
