import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY ?? '';

if (!resendApiKey) {
  console.warn('Missing Resend API key. Email functionality will not work.');
}

export const resend = resendApiKey ? new Resend(resendApiKey) : null;

export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'noreply@yourdomain.com';
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'admin@yourdomain.com';
