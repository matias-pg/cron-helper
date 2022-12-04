import { createSignal } from "solid-js";
import { DOMElement } from "solid-js/jsx-runtime";
import useCron from "~/hooks/useCron";
import { explainCron } from "~/utils/cron";

import "./CronHelper.css";

export default function CronHelper() {
  const [verbose, setVerbose] = createSignal(false);
  const [cron, setCron] = useCron("* * * * *");

  const onInput = ({ target }: { target: DOMElement }) => {
    if (target instanceof HTMLInputElement) {
      setCron(target.value);
    }
  };

  const { explanation, isInvalid } = explainCron(cron(), { verbose: true });

  return (
    <div class="card">
      <div>
        <label for="cron-input">Enter your cron here</label>
        <br />
        <input
          id="cron-input"
          type="text"
          value={cron()}
          onInput={onInput}
          autocomplete="off"
        />
      </div>
      <div>
        <label for="verbose-checkbox">Verbose</label>
        <br />
        <input
          id="verbose-checkbox"
          type="checkbox"
          checked={verbose()}
          onChange={() => setVerbose((verbose) => !verbose)}
        />
      </div>
      <p>
        Explanation:{" "}
        {isInvalid ? <span class="error">{explanation}</span> : explanation}
      </p>
    </div>
  );
}
