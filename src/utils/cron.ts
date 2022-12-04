import cronstrue from "cronstrue";

type CronOptions = Parameters<typeof cronstrue.toString>[1];

export function explainCron(cron: string, options?: CronOptions) {
  let explanation: string;
  let isInvalid = false;

  try {
    explanation = cronstrue.toString(cron, options);
  } catch (e) {
    explanation = String(e);
    isInvalid = true;
  }

  return { explanation, isInvalid };
}
