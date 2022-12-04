import { setupCronHelper } from "./cron-helper";
import "./style.css";

const cronInput = document.querySelector<HTMLInputElement>("#cron-input")!;
const verboseCheckbox =
  document.querySelector<HTMLInputElement>("#verbose-checkbox")!;
const explanationEl =
  document.querySelector<HTMLParagraphElement>("#explanation")!;

setupCronHelper({
  defaultCron: "* * * * *",
  cronInput,
  verboseCheckbox,
  explanationEl,
});
