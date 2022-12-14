import { explainCron } from "./utils/cron";
import { getParamsFromURL, setURLParams } from "./utils/url";

import "./style.css";

const defaultCron = "* * * * *";

// The value of these inputs will be the source of truth/state store
const cronInput = document.querySelector<HTMLInputElement>("#cron")!;
const verboseCheckbox = document.querySelector<HTMLInputElement>("#verbose")!;
const explanationEl = document.querySelector("#explanation")!;

function renderExplanation() {
  // We may add more options if needed
  const { explanation, isValid } = explainCron(cronInput.value, {
    verbose: verboseCheckbox.checked,
  });

  explanationEl.textContent = explanation;
  explanationEl.classList.toggle("error", !isValid);
}

function setState(cron: string, verbose: boolean) {
  cronInput.value = cron;
  verboseCheckbox.checked = verbose;

  // Reflect the state changes to the URL
  // Delete this? It's not useful since it doesn't add an entry to the history
  setURLParams({ cron, verbose: verbose ? "1" : "" });

  renderExplanation();
}

/** Sets the state from URL params. */
function initializeState() {
  const { cron, verbose } = getParamsFromURL(defaultCron);
  setState(cron, verbose);
}

cronInput.addEventListener("input", function () {
  setState(this.value, verboseCheckbox.checked);
});

verboseCheckbox.addEventListener("change", function () {
  setState(cronInput.value, this.checked);
});

// Sync external URL changes to the state
window.addEventListener("popstate", initializeState);

initializeState();
