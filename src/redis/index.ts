import { createClient } from "redis";

const REDIS_URL = process.env.REDIS_URL;

export const redis = createClient({
    url: REDIS_URL
});