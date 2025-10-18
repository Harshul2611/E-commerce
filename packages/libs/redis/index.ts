import Redis from "ioredis";

if (!process.env.REDIS_URI) {
  throw new Error("❌ Missing REDIS_URI environment variable");
}

const redis = new Redis(process.env.REDIS_URI);

export default redis;
