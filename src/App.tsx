import { useState } from "react";
import useCron from "./useCron";

import "./App.css";

function App() {
  const [verbose, setVerbose] = useState(false);
  const { cron, setCron, explanation, isInvalid } = useCron("* * * * *", {
    verbose,
  });

  return (
    <div className="App">
      <h1>Cron helper</h1>
      <div className="card">
        <div>
          <label htmlFor="cron-input">Enter your cron here</label>
          <br />
          <input
            id="cron-input"
            type="text"
            value={cron}
            onChange={({ target: { value } }) => setCron(value)}
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="verbose-checkbox">Verbose</label>
          <br />
          <input
            id="verbose-checkbox"
            type="checkbox"
            checked={verbose}
            onChange={() => setVerbose((verbose) => !verbose)}
          />
        </div>
        <p>
          Explanation:{" "}
          {isInvalid ? (
            <span className="error">{explanation}</span>
          ) : (
            explanation
          )}
        </p>
      </div>
    </div>
  );
}

export default App;
