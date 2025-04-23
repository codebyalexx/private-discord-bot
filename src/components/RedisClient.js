// RedisClient.js
import { createClient } from "redis";

class RedisClient {
  constructor() {
    this.client = createClient({
      socket: {
        host: process.env.REDIS_HOST || "localhost",
        port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
      },
      password: process.env.REDIS_PASSWORD || undefined,
    });

    this.client.on("error", (err) => {
      console.error("Redis Client Error:", err);
    });

    this.client.on("connect", () => {
      console.log("✅ Redis connected");
    });

    this.client.on("reconnecting", () => {
      console.log("♻️ Redis reconnecting...");
    });

    this.client.on("ready", () => {
      console.log("🚀 Redis ready");
    });
  }

  async connect() {
    if (!this.client.isOpen) {
      await this.client.connect();
    }
  }

  async disconnect() {
    if (this.client.isOpen) {
      await this.client.quit();
    }
  }

  async set(key, value, expireInSec = null) {
    if (expireInSec) {
      await this.client.set(key, value, { EX: expireInSec });
    } else {
      await this.client.set(key, value);
    }
  }

  async get(key) {
    return await this.client.get(key);
  }

  async del(key) {
    return await this.client.del(key);
  }

  getRawClient() {
    return this.client;
  }
}

export default RedisClient;
