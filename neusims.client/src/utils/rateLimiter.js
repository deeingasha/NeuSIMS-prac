// src/utils/rateLimiter.js
class RateLimiter {
  constructor(limit = 10, interval = 1000) {
    this.limit = limit;
    this.interval = interval;
    this.tokens = limit;
    this.last = Date.now();
  }

  async tryAcquire() {
    const now = Date.now();
    const elapsed = now - this.last;
    this.last = now;
    this.tokens += elapsed * (this.limit / this.interval);

    if (this.tokens > this.limit) {
      this.tokens = this.limit;
    }

    if (this.tokens < 1) {
      return false;
    }

    this.tokens -= 1;
    return true;
  }
}

export const rateLimiter = new RateLimiter();
