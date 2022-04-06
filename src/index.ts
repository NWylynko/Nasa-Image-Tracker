import "source-map-support/register";
import "dotenv/config";

import { app } from "./app";
import { checkForNewImage } from "./jobs/checkForNewImage";
import cron from "node-cron";

const main = async () => {

    const NASA_KEY = process.env.NASA_KEY;
    const PORT = process.env.PORT || 3000;
    const REDIS_URL = process.env.REDIS_URL;
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const SENDGRID_FROM = process.env.SENDGRID_FROM;

    if (!NASA_KEY) {
        throw new Error("No Nasa api key found in environment variables, please go to `api.nasa.gov` to generate a key, then set it to NASA_KEY");
    }

    if (!REDIS_URL) {
        throw new Error("No Redis url found in environment, please set REDIS_URL");
    }

    if (!SENDGRID_API_KEY) {
        throw new Error("No Sendgrid api key found in environment, please go to `sendgrid.com` to generate a key, please set SENDGRID_API_KEY");
    }

    if (!SENDGRID_FROM) {
        throw new Error("No Sendgrid from email found in environment, please get SENDGRID_FROM to the email to send them from");
    }

    try {
        await app.listen(PORT, "127.0.0.1");
    } catch (error) {
        console.error(`failed to listen on PORT ${PORT}`, error);
    }

    cron.schedule("0 * * * *", checkForNewImage);

};

main();