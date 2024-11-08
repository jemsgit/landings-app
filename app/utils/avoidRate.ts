export function avoidRateLimit(delay = 500) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
