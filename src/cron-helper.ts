import cronstrue from "cronstrue";

function getSearchParams(defaultCron: string) {
  const params = new URLSearchParams(window.location.search);

  const cron = params.get("cron") ?? defaultCron;
  const verbose = Boolean(params.get("verbose"));

  return { cron, verbose };
}

function setSearchParams(params: Record<string, string>) {
  const allParams = new URLSearchParams(location.search);
  Object.entries(params).forEach(([key, value]) => allParams.set(key, value));

  window.history.replaceState(
    {},
    "",
    `${location.pathname}?${allParams.toString()}`
  );
}

function explainCron(...args: Parameters<typeof cronstrue.toString>) {
  try {
    return { isValid: true, explanation: cronstrue.toString(...args) };
  } catch (error) {
    return { isValid: false, explanation: error };
  }
}

type Arguments = {
  defaultCron: string;

  cronInput: HTMLInputElement;
  verboseCheckbox: HTMLInputElement;

  explanationEl: HTMLElement;
};

export function setupCronHelper({
  defaultCron,
  cronInput,
  verboseCheckbox,
  explanationEl,
}: Arguments) {
  function render() {
    const { explanation, isValid } = explainCron(cronInput.value, {
      verbose: verboseCheckbox.checked,
    });

    explanationEl.innerHTML = `Explanation: ${explanation}`;
    explanationEl.classList.toggle("error", !isValid);
  }

  function setState(cron: string, verbose: boolean) {
    cronInput.value = cron;
    verboseCheckbox.checked = verbose;

    setSearchParams({ cron, verbose: verbose ? "1" : "" });

    render();
  }

  function setStateBySearchParams() {
    const { cron, verbose } = getSearchParams(defaultCron);
    setState(cron, verbose);
  }

  cronInput.addEventListener("input", ({ target }) => {
    if (target instanceof HTMLInputElement) {
      setState(target.value, verboseCheckbox.checked);
    }
  });

  verboseCheckbox.addEventListener("change", ({ target }) => {
    if (target instanceof HTMLInputElement) {
      setState(cronInput.value, target.checked);
    }
  });

  window.addEventListener("popstate", setStateBySearchParams);

  setStateBySearchParams();
}
