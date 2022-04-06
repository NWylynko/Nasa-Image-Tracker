import { FastifyRequest } from "fastify";
import { redis } from "../redis";

interface Body {
    email: string;
}

export const registerHandler = async (request: FastifyRequest) => {

    const { email } = request.body as Partial<Body>;

    if (!email) {
        throw new Error("Email not supplied");
    }

    const result = await register(email);

    return {
        success: true,
        result
    };
};

const register = async (email: string) => {

    const client = await redis();

    client.rPush("emails", email);

    return {
        email,
    };
};