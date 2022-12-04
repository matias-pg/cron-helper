import cronstrue from "cronstrue";
import { useSearchParams } from "react-router-dom";

type CronOptions = Parameters<typeof cronstrue.toString>[1];

export default function useCron(defaultCron: string, options?: CronOptions) {
  const [searchParams, setSearchParams] = useSearchParams({
    cron: defaultCron,
  });

  const cron = searchParams.get("cron") ?? defaultCron;
  const setCron = (cron: string) =>
    setSearchParams((current) => ({ ...current, cron }));

  let explanation: string;
  let isInvalid = false;

  try {
    explanation = cronstrue.toString(cron, options);
  } catch (e) {
    explanation = String(e);
    isInvalid = true;
  }

  return { cron, setCron, explanation, isInvalid } as const;
}
