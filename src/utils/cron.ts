import cronstrue from "cronstrue";
import { Options } from "cronstrue/dist/options";

/**
 * Gets an explanation of a cron, indicating if it was successful or not. If it
 * wasn't successful, the explanation will be the error thrown by cRonstrue.
 *
 * @param cron Cron to be explained
 * @param options Options to be passed to cRonstrue
 */
export function explainCron(cron: string, options?: Options) {
  try {
    return { isValid: true, explanation: cronstrue.toString(cron, options) };
  } catch (error) {
    return { isValid: false, explanation: String(error) };
  }
}
