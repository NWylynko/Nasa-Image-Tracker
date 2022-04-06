import { redis } from "../redis";
import Axios from "axios";
import sgMail from "@sendgrid/mail";

interface AstronomyPictureOfTheDay  {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

const axios = Axios.create({
    baseURL: "https://api.nasa.gov/"
});

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_FROM = process.env.SENDGRID_FROM;

if (!SENDGRID_API_KEY) {
    throw new Error("No Sendgrid api key found in environment, please go to `sendgrid.com` to generate a key, please set SENDGRID_API_KEY");
}

if (!SENDGRID_FROM) {
    throw new Error("No Sendgrid from email found in environment, please get SENDGRID_FROM to the email to send them from");
}

sgMail.setApiKey(SENDGRID_API_KEY);


export const checkForNewImage = async () => {

    const { data: result } = await axios.get<AstronomyPictureOfTheDay>("planetary/apod", {});

    const client = await redis();

    const oldImageDate = await client.get("apod-date");

    if (oldImageDate === result.date) return;

    await client.set("apod-date", result.date);

    const emails = await client.lRange("emails", 0, -1);

    const emailTemplate = {
        from: SENDGRID_FROM,
        subject: "New Picture of the day :)",
        html: `<body><strong>${result.title}</strong><img src="${result.url}" /><span>${result.explanation}</span></body>`,
    };

    return Promise.all(emails.map(async (email: string) => {
        const msg = {
            ...emailTemplate,
            to: email
        };
        return sgMail.send(msg);
    }));

};