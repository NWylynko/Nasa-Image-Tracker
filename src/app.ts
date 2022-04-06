import Fastify from "fastify";

import { registerHandler } from "./endpoints/register";

export const app = Fastify({
    logger: true,
});

app.post("/register", registerHandler);