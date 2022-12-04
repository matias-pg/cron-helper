import { Signal } from "solid-js";
import { useSearchParams } from "solid-start";

export default function useCron(defaultCron: string): Signal<string> {
  const [{ cron = defaultCron }, setSearchParams] = useSearchParams();

  const setCron = (cron: string) => setSearchParams({ cron });

  return [() => cron, setCron] as Signal<string>;
}
