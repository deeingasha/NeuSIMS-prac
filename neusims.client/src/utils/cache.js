// src/utils/cache.js
const cache = new Map();

export const cacheData = (key, data, ttl = 5 * 60 * 1000) => {
  cache.set(key, {
    data,
    timestamp: Date.now(),
    ttl,
  });
};

export const getCachedData = (key) => {
  const cached = cache.get(key);
  if (!cached) return null;

  const isExpired = Date.now() - cached.timestamp > cached.ttl;
  if (isExpired) {
    cache.delete(key);
    return null;
  }

  return cached.data;
};
