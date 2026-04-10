# Deployment Guide - Silex Digital

This guide provides step-by-step instructions for deploying the Silex Digital website to production.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Vercel Deployment](#vercel-deployment)
3. [Environment Variables Configuration](#environment-variables-configuration)
4. [Supabase Database Setup](#supabase-database-setup)
5. [Resend Email Configuration](#resend-email-configuration)
6. [Post-Deployment Checklist](#post-deployment-checklist)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying, ensure you have:

- A GitHub repository with your code
- A Supabase account and project set up
- A Resend account and API key
- A Vercel account (free tier is sufficient)

## Vercel Deployment

Vercel is the recommended deployment platform for Next.js applications.

### Step 1: Prepare Your Repository

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Ensure `.gitignore` is properly configured**
   - `.env` should be in `.gitignore` (it is by default)
   - Only `.env.example` should be committed

### Step 2: Deploy to Vercel

1. **Log in to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up or log in with your GitHub account

2. **Import Your Repository**
   - Click "Add New Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Project Settings**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Configure Environment Variables**
   - Scroll to "Environment Variables" section
   - Add the following variables (see [Environment Variables Configuration](#environment-variables-configuration) for details):

   | Variable | Value |
   |----------|-------|
   | `NEXT_PUBLIC_SITE_URL` | Your production URL (e.g., `https://your-site.vercel.app`) |
   | `SUPABASE_URL` | Your Supabase project URL |
   | `SUPABASE_ANON_KEY` | Your Supabase anon key |
   | `RESEND_API_KEY` | Your Resend API key |
   | `RESEND_FROM_EMAIL` | Your verified sender email |
   | `ADMIN_EMAIL` | Your admin email |
   | `ADMIN_PASSWORD` | Your admin password |

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (typically 2-3 minutes)
   - Your site will be live at `https://your-project-name.vercel.app`

### Step 3: Configure Custom Domain (Optional)

1. **Add a Custom Domain**
   - Go to your project settings in Vercel
   - Click "Domains"
   - Add your custom domain (e.g., `silexdigital.com`)
   - Follow the DNS instructions provided

2. **Update Environment Variables**
   - Update `NEXT_PUBLIC_SITE_URL` to your custom domain
   - Redeploy the project

## Environment Variables Configuration

### Production Environment Variables

Add these variables in your Vercel project settings:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL="https://your-site.vercel.app"

# Supabase Configuration
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_ANON_KEY="your-supabase-anon-key"

# Resend Configuration (Email)
RESEND_API_KEY="re_your-resend-api-key"
RESEND_FROM_EMAIL="noreply@yourdomain.com"

# Admin Dashboard Configuration
ADMIN_EMAIL="admin@yourdomain.com"
ADMIN_PASSWORD="your-secure-admin-password"
```

### Security Best Practices

1. **Never commit `.env` to version control**
2. **Use strong passwords** for admin credentials
3. **Rotate API keys** periodically
4. **Use environment-specific variables** for staging/production
5. **Enable Vercel's environment variable protection** for sensitive values

## Supabase Database Setup

### Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up
2. Click "New Project"
3. Fill in the project details:
   - **Name**: `silex-digital` (or your preferred name)
   - **Database Password**: Generate a strong password and save it
   - **Region**: Choose the region closest to your users
4. Click "Create new project" and wait for setup (2-3 minutes)

### Step 2: Set Up Database Tables

1. **Open the SQL Editor**
   - In your Supabase dashboard, go to "SQL Editor"
   - Click "New Query"

2. **Run the Schema**
   - Copy the contents of [`src/config/supabase-schema.sql`](src/config/supabase-schema.sql)
   - Paste it into the SQL Editor
   - Click "Run" to execute the schema

   This creates the following tables:
   - `leads` - Stores contact form submissions
   - `blog_posts` - Stores blog content
   - `projects` - Stores portfolio projects

3. **Verify Tables**
   - Go to "Table Editor" in Supabase
   - You should see the three tables created

### Step 3: Configure Row Level Security (RLS)

The schema includes RLS policies for security. Review them:

1. **Leads Table**
   - Public can insert (contact form)
   - Only authenticated admin can read

2. **Blog Posts Table**
   - Public can read
   - Only authenticated admin can insert/update/delete

3. **Projects Table**
   - Public can read
   - Only authenticated admin can insert/update/delete

### Step 4: Get Your Credentials

1. **Go to Project Settings**
   - Click the gear icon (Settings) → "API"

2. **Copy Your Credentials**
   - **Project URL**: Copy this to your `.env` as `SUPABASE_URL`
   - **anon/public Key**: Copy this to your `.env` as `SUPABASE_ANON_KEY`

3. **Add to Vercel**
   - Add these credentials to your Vercel environment variables

### Step 5: Test Database Connection

After deployment, test the connection:

1. Visit your deployed site
2. Submit a contact form
3. Check the `leads` table in Supabase to verify data is being stored

## Resend Email Configuration

### Step 1: Create a Resend Account

1. Go to [resend.com](https://resend.com) and sign up
2. Verify your email address

### Step 2: Get Your API Key

1. **Generate API Key**
   - Go to "API Keys" in your Resend dashboard
   - Click "Create API Key"
   - Give it a name (e.g., "Silex Digital Production")
   - Copy the API key

2. **Add to Vercel**
   - Add the API key as `RESEND_API_KEY` in your Vercel environment variables

### Step 3: Verify Your Domain

1. **Add a Domain**
   - Go to "Domains" in your Resend dashboard
   - Click "Add Domain"
   - Enter your domain (e.g., `silexdigital.com`)

2. **Configure DNS**
   - Add the DNS records provided by Resend to your domain's DNS settings
   - Wait for DNS propagation (usually 5-10 minutes)

3. **Verify Domain**
   - Once DNS is configured, click "Verify" in Resend

4. **Alternative: Use Resend's Free Domain**
   - For testing, you can use Resend's free domain: `@resend.dev`
   - No DNS configuration needed

### Step 4: Configure Sender Email

1. **Set Up Sender Email**
   - Add `RESEND_FROM_EMAIL` to your Vercel environment variables
   - Use a verified email from your domain (e.g., `noreply@silexdigital.com`)

2. **Test Email Sending**
   - Submit a contact form on your deployed site
   - Check that the email is received at the admin email address

### Step 5: Email Templates

The email templates are located in [`src/lib/email-templates.ts`](src/lib/email-templates.ts). Customize them as needed:

- **Lead Notification Email**: Sent to admin when a contact form is submitted
- **Admin Password Reset Email**: (Future enhancement) For password resets

## Post-Deployment Checklist

After deployment, complete these steps to ensure everything is working correctly:

### 1. Verify Website Functionality

- [ ] Homepage loads correctly
- [ ] Navigation menu works
- [ ] All pages are accessible
- [ ] Links work properly
- [ ] Images load correctly
- [ ] Animations play smoothly

### 2. Test Contact Form

- [ ] Submit a test contact form
- [ ] Verify data appears in Supabase `leads` table
- [ ] Verify email is sent to admin
- [ ] Check form validation works

### 3. Test Admin Dashboard

- [ ] Admin login works with configured credentials
- [ ] Dashboard loads and displays stats
- [ ] Can view leads
- [ ] Can create/edit/delete blog posts
- [ ] Can manage projects
- [ ] Logout functionality works

### 4. Test Blog Functionality

- [ ] Blog listing page displays posts
- [ ] Individual blog posts load correctly
- [ ] Category filtering works
- [ ] Blog posts created in admin appear on public site

### 5. Test Portfolio

- [ ] Portfolio page displays projects
- [ ] Project cards link correctly
- [ ] All project images load

### 6. Test Demo Pages

- [ ] All demo pages are accessible
- [ ] Demo navigation works
- [ ] Interactive elements function correctly

### 7. Verify SEO

- [ ] Page titles are correct
- [ ] Meta descriptions are set
- [ ] Open Graph tags work (test with Facebook debugger)
- [ ] Twitter cards work
- [ ] Sitemap is accessible at `/sitemap.xml`
- [ ] Robots.txt is accessible at `/robots.txt`

### 8. Performance Check

- [ ] Page load times are acceptable (< 3 seconds)
- [ ] Lighthouse score is good (> 90)
- [ ] No console errors in browser
- [ ] No broken links

### 9. Security Check

- [ ] Admin routes are protected
- [ ] Environment variables are not exposed
- [ ] HTTPS is enabled
- [ ] Security headers are set (configured in `next.config.js`)

### 10. Mobile Responsiveness

- [ ] Site looks good on mobile devices
- [ ] Touch interactions work
- [ ] Mobile navigation works
- [ ] Forms are usable on mobile

## Troubleshooting

### Build Failures

**Issue**: Build fails in Vercel

**Solutions**:
1. Check the build logs for specific errors
2. Ensure all dependencies are in `package.json`
3. Run `npm run build` locally to reproduce the issue
4. Check that TypeScript types are valid: `npm run typecheck`

### Environment Variables Not Working

**Issue**: Environment variables not accessible in production

**Solutions**:
1. Ensure variables are added in Vercel project settings
2. Variables starting with `NEXT_PUBLIC_` are available in browser
3. Server-only variables (without `NEXT_PUBLIC_`) are only available server-side
4. Redeploy after adding/changing environment variables

### Database Connection Issues

**Issue**: Cannot connect to Supabase

**Solutions**:
1. Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY` are correct
2. Check Supabase project status (should be "Active")
3. Verify RLS policies allow the operations you're trying to perform
4. Check Supabase logs for connection errors

### Email Not Sending

**Issue**: Contact form doesn't send email

**Solutions**:
1. Verify `RESEND_API_KEY` is correct and valid
2. Check that sender domain is verified in Resend
3. Verify `RESEND_FROM_EMAIL` matches a verified sender
4. Check Resend dashboard for email logs
5. Verify `ADMIN_EMAIL` is correct

### Images Not Loading

**Issue**: Images from external sources don't load

**Solutions**:
1. Ensure image domains are configured in `next.config.js`
2. Check that `images.unsplash.com` is in remote patterns
3. For Supabase storage, ensure bucket is public
4. Verify image URLs are correct

### Admin Login Issues

**Issue**: Cannot log in to admin dashboard

**Solutions**:
1. Verify `ADMIN_EMAIL` and `ADMIN_PASSWORD` are correct
2. Check that cookies are enabled in your browser
3. Clear browser cache and cookies
4. Check browser console for errors
5. Verify the auth route is working: check `/api/admin/auth`

### Performance Issues

**Issue**: Site is slow to load

**Solutions**:
1. Enable Vercel Analytics to identify bottlenecks
2. Optimize images (use WebP format, compress)
3. Enable caching headers
4. Use Next.js Image component for all images
5. Minimize JavaScript bundle size
6. Consider using Vercel Edge Functions for static content

### SEO Issues

**Issue**: Pages not indexed by search engines

**Solutions**:
1. Verify `robots.txt` allows indexing
2. Check that meta tags are properly set
3. Submit sitemap to Google Search Console
4. Ensure pages are accessible to crawlers
5. Check for canonical URLs
6. Verify structured data is valid

## Monitoring and Maintenance

### Set Up Monitoring

1. **Vercel Analytics**
   - Enable in Vercel project settings
   - Monitor page views, performance, and errors

2. **Supabase Logs**
   - Monitor database queries and errors
   - Set up alerts for unusual activity

3. **Resend Dashboard**
   - Monitor email delivery rates
   - Check for bounced emails

### Regular Maintenance

1. **Update Dependencies**
   ```bash
   npm update
   npm audit fix
   ```

2. **Monitor Database Size**
   - Check Supabase storage usage
   - Clean up old leads if needed

3. **Backup Database**
   - Enable Supabase automated backups
   - Export regular backups

4. **Review Security**
   - Rotate API keys periodically
   - Update admin passwords
   - Review RLS policies

## Scaling Considerations

As your site grows, consider:

1. **CDN**: Vercel automatically uses a global CDN
2. **Database**: Supabase scales automatically within its tier
3. **Email**: Resend has generous free limits, upgrade as needed
4. **Caching**: Implement Redis for frequently accessed data
5. **Load Balancing**: Vercel handles this automatically

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Resend Documentation](https://resend.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

## Support

If you encounter issues not covered in this guide:

1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Review [Vercel deployment docs](https://vercel.com/docs/deployments/overview)
3. Check [Supabase troubleshooting](https://supabase.com/docs/guides/troubleshooting)
4. Open an issue on GitHub

---

Deployed successfully! 🚀
