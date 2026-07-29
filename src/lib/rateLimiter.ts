/**
 * In-memory sliding-window IP rate limiter.
 *
 * Trade-off: In a serverless environment each container instance has its own
 * memory, so limits are per-instance rather than globally enforced.
 * For this scale (a contact form), this is fully acceptable.
 * If stricter global limiting is needed, swap in @upstash/ratelimit + Redis.
 */

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const store = new Map<string, RateLimitRecord>();

// Clean up stale entries every 5 minutes to prevent memory leak
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of store.entries()) {
    if (now > record.resetTime) {
      store.delete(key);
    }
  }
}, 5 * 60 * 1000);

/**
 * @param identifier  IP address or other unique token
 * @param limit       Max allowed requests in the window
 * @param windowMs    Time window in milliseconds
 * @returns           { allowed: boolean; remaining: number; resetTime: number }
 */
export function rateLimit(
  identifier: string,
  limit: number = 5,
  windowMs: number = 15 * 60 * 1000 // 15 minutes
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = store.get(identifier);

  if (!record || now > record.resetTime) {
    // First request or window expired — start a fresh window
    store.set(identifier, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetTime: now + windowMs };
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: limit - record.count,
    resetTime: record.resetTime,
  };
}
