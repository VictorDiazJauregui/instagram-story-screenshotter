import dotenv from 'dotenv';

dotenv.config();

export const accounts = JSON.parse(process.env.INSTAGRAM_ACCOUNTS);
export const username = process.env.INSTAGRAM_USERNAME;
export const password = process.env.INSTAGRAM_PASSWORD;
