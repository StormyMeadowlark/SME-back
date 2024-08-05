import dotenv from 'dotenv'

dotenv.config();

export const FOOTER_MAPS_API_KEY = process.env.FOOTER_MAPS_API_KEY
export const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
export const API_KEY = process.env.API_KEY;
export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_ADVISOR = process.env.EMAIL_ADVISOR;
export const SENDGRID_CAREER_KEY =process.env.SENDGRID_CAREER_KEY;
export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
export const FRONTEND_DOMAIN = process.env.FRONTEND_DOMAIN;
export const SALT_ROUNDS = process.env.SALT_ROUNDS;
export const SECRET_ACCESS_TOKEN = process.env.SECRET_ACCESS_TOKEN;
export const URI = process.env.URI;
export const SENDGRID_CONTACT_KEY = process.env.SENDGRID_CONTACT_KEY
export const PORT = process.env.PORT || 5001
export const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY
export default {
 FOOTER_MAPS_API_KEY: process.env.FOOTER_MAPS_API_KEY,
ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
API_KEY: process.env.API_KEY,
EMAIL_USER: process.env.EMAIL_USER,
EMAIL_ADVISOR: process.env.EMAIL_ADVISOR,
SENDGRID_CAREER_KEY: process.env.SENDGRID_CAREER_KEY,
FRONTEND_DOMAIN: process.env.FRONTEND_DOMAIN,
SALT_ROUNDS: process.env.SALT_ROUNDS,
URI: process.env.URI,
SENDGRID_CONTACT_KEY: process.env.SENDGRID_CONTACT_KEY,
PORT: process.env.PORT || 5001,
GOOGLE_MAPS_API_KEY: process.GOOGLE_MAPS_API_KEY,
};
