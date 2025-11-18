export function logError(context, error) {
  console.error(`❌ ${context} —`, error?.message || error);
}
