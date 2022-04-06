import { createClient } from "redis";

const REDIS_URL = process.env.REDIS_URL;

let connected = false;

const client = createClient({
    url: REDIS_URL
});

export const redis = async () => {
    if (connected) {
        return client;
    } else {
        await client.connect();
        connected = true;
        return client;
    }
};