import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'admin_session';
const SESSION_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export interface AdminSession {
  authenticated: boolean;
  timestamp: number;
}

/**
 * Verify if the current user has a valid admin session
 */
export async function verifyAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (!sessionCookie) {
    return false;
  }

  try {
    const session = JSON.parse(sessionCookie.value) as AdminSession;
    return session.authenticated === true;
  } catch {
    return false;
  }
}

/**
 * Create an admin session by setting the session cookie
 */
export async function createAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  const session: AdminSession = {
    authenticated: true,
    timestamp: Date.now(),
  };

  cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_COOKIE_MAX_AGE,
    path: '/',
  });
}

/**
 * Destroy the admin session
 */
export async function destroyAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * Validate admin credentials against environment variables
 */
export function validateAdminCredentials(email: string, password: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.error('ADMIN_EMAIL or ADMIN_PASSWORD environment variables are not set');
    return false;
  }

  return email === adminEmail && password === adminPassword;
}

/**
 * Middleware function to protect admin routes
 * This should be called in server components or route handlers
 */
export async function requireAdminAuth(): Promise<void> {
  const isAuthenticated = await verifyAdminSession();
  if (!isAuthenticated) {
    throw new Error('Unauthorized');
  }
}
