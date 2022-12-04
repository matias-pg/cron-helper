import { useState } from "preact/hooks";
import useCron from "./useCron";

import "./app.css";

export default function App() {
  const [verbose, setVerbose] = useState(false);
  const { cron, setCron, explanation, isInvalid } = useCron("* * * * *", {
    verbose,
  });

  const onInput = ({ target }: { target: EventTarget | null }) => {
    if (target instanceof HTMLInputElement) {
      setCron(target.value);
    }
  };

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
            onInput={onInput}
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
