/**
 * Gets the values of the `cron` and `verbose` query params as a string and
 * boolean respectively.
 *
 * @param defaultCron Default `cron` value if the param is absent
 * @returns An object containing the values of the parameters
 */
export function getParamsFromURL(defaultCron: string) {
  const params = new URLSearchParams(window.location.search);

  const cron = params.get("cron") ?? defaultCron;
  const verbose = Boolean(params.get("verbose"));

  return { cron, verbose };
}

/**
 * Modifies the current URL by setting the query parameters defined in the
 * `params` argument, ignoring the existing ones (if any).
 *
 * Note that it does not add a new URL to the history. This is to prevent
 * cluttering the history, which would be annoying since the back button will
 * not take the user to the previous page.
 *
 * @param params Object containing the query params and their values
 */
export function setURLParams(params: Record<string, string>) {
  const searchParams = new URLSearchParams(params);

  window.history.replaceState(
    {},
    "",
    `${location.pathname}?${searchParams.toString()}`
  );
}
