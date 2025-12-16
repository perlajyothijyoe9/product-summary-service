
import Redis from "ioredis";
export const redis = new Redis(process.env.REDIS_URL!);

export async function cacheGet<T>(key: string): Promise<T | null> {
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
}

export async function cacheSet(key: string, value: any, ttl = 30) {
  await redis.set(key, JSON.stringify(value), "EX", ttl);
}
