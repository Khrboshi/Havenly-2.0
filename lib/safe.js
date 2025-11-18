import { logError } from "./errors";

/**
 * Wrap any async function in a safety net.
 * Prevents UI from crashing due to unexpected errors.
 */
export async function safeAsync(fn, context = "Unknown Async Call") {
  try {
    return await fn();
  } catch (e) {
    logError(context, e);
    return null;
  }
}
