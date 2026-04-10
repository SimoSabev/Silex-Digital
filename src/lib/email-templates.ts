import type { Lead } from '@/types/lead';

/**
 * Project type labels for display in emails
 */
const projectTypeLabels: Record<string, string> = {
  'automation': 'Automation',
  'ai-agent': 'AI Agent',
  'seo': 'SEO Optimization',
  'ecommerce': 'E-commerce',
  'custom-platform': 'Custom Platform',
  'web-development': 'Web Development',
  'other': 'Other',
};

/**
 * Create HTML email template for confirmation email (in Bulgarian)
 */
export function createConfirmationEmail(
  name: string,
  email: string,
  projectType: string
): string {
  const projectLabel = projectTypeLabels[projectType] ?? projectType;

  return `
<!DOCTYPE html>
<html lang="bg">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Благодарим ви за вашето запитване</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f4f4f4;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 40px 30px;
      text-align: center;
    }
    .header h1 {
      color: #ffffff;
      margin: 0;
      font-size: 28px;
      font-weight: 700;
    }
    .content {
      padding: 40px 30px;
    }
    .content h2 {
      color: #333;
      font-size: 22px;
      margin-bottom: 20px;
    }
    .content p {
      color: #666;
      margin-bottom: 16px;
      font-size: 16px;
    }
    .info-box {
      background-color: #f8f9fa;
      border-left: 4px solid #667eea;
      padding: 20px;
      margin: 24px 0;
      border-radius: 4px;
    }
    .info-box p {
      margin: 8px 0;
      color: #333;
    }
    .info-box strong {
      color: #667eea;
    }
    .footer {
      background-color: #f8f9fa;
      padding: 30px;
      text-align: center;
      border-top: 1px solid #e5e5e5;
    }
    .footer p {
      margin: 8px 0;
      color: #999;
      font-size: 14px;
    }
    .footer a {
      color: #667eea;
      text-decoration: none;
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: #ffffff;
      padding: 14px 32px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Благодарим ви! 🎉</h1>
    </div>
    <div class="content">
      <h2>Вашето запитване е получено</h2>
      <p>Здравейте, <strong>${name}</strong>!</p>
      <p>Благодарим ви за проявения интерес към нашите услуги. Получихме вашето запитване за <strong>${projectLabel}</strong> проект.</p>
      
      <div class="info-box">
        <p><strong>Имейл:</strong> ${email}</p>
        <p><strong>Тип проект:</strong> ${projectLabel}</p>
      </div>
      
      <p>Нашият екип ще прегледа вашето запитване и ще се свърже с вас в рамките на 24 работни часа.</p>
      <p>Ако имате въпроси или искате да добавите допълнителна информация, не се колебайте да ни пишете.</p>
      
      <a href="mailto:info@silexdigital.com" class="button">Свържете се с нас</a>
    </div>
    <div class="footer">
      <p><strong>Silex Digital</strong></p>
      <p>Вашят надежден партньор за дигитални решения</p>
      <p>
        <a href="https://silexdigital.com">Уебсайт</a> | 
        <a href="mailto:info@silexdigital.com">Имейл</a>
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Create HTML email template for admin notification
 */
export function createNotificationEmail(lead: Lead): string {
  const projectLabel = projectTypeLabels[lead.projectType] ?? lead.projectType;
  const createdAt = new Date(lead.createdAt).toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Lead Received - ${lead.name}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f4f4f4;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      padding: 40px 30px;
      text-align: center;
    }
    .header h1 {
      color: #ffffff;
      margin: 0;
      font-size: 28px;
      font-weight: 700;
    }
    .header .subtitle {
      color: #ffffff;
      margin: 8px 0 0 0;
      font-size: 16px;
      opacity: 0.9;
    }
    .content {
      padding: 40px 30px;
    }
    .content h2 {
      color: #333;
      font-size: 20px;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #e5e5e5;
    }
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 24px;
    }
    .info-item {
      background-color: #f8f9fa;
      padding: 16px;
      border-radius: 8px;
    }
    .info-item.full-width {
      grid-column: span 2;
    }
    .info-label {
      display: block;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #999;
      margin-bottom: 4px;
    }
    .info-value {
      font-size: 16px;
      font-weight: 600;
      color: #333;
      word-break: break-word;
    }
    .message-box {
      background-color: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 8px;
      padding: 20px;
      margin: 24px 0;
    }
    .message-box .info-label {
      color: #059669;
    }
    .message-box .info-value {
      color: #333;
      font-weight: 400;
      white-space: pre-wrap;
    }
    .status-badge {
      display: inline-block;
      padding: 6px 12px;
      background-color: #dbeafe;
      color: #1d4ed8;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
    }
    .footer {
      background-color: #f8f9fa;
      padding: 30px;
      text-align: center;
      border-top: 1px solid #e5e5e5;
    }
    .footer p {
      margin: 8px 0;
      color: #999;
      font-size: 14px;
    }
    .action-buttons {
      display: flex;
      gap: 12px;
      margin-top: 24px;
    }
    .action-button {
      flex: 1;
      display: inline-block;
      padding: 12px 24px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      text-align: center;
      font-size: 14px;
    }
    .action-button.primary {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: #ffffff;
    }
    .action-button.secondary {
      background-color: #e5e5e5;
      color: #333;
    }
    @media (max-width: 600px) {
      .info-grid {
        grid-template-columns: 1fr;
      }
      .info-item.full-width {
        grid-column: span 1;
      }
      .action-buttons {
        flex-direction: column;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎯 New Lead Received</h1>
      <p class="subtitle">A potential client has submitted an inquiry</p>
    </div>
    <div class="content">
      <h2>Lead Information</h2>
      
      <div class="info-grid">
        <div class="info-item">
          <span class="info-label">Lead ID</span>
          <span class="info-value">${lead.id}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Status</span>
          <span class="status-badge">${lead.status}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Full Name</span>
          <span class="info-value">${lead.name}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Email</span>
          <span class="info-value">
            <a href="mailto:${lead.email}" style="color: #059669; text-decoration: none;">${lead.email}</a>
          </span>
        </div>
        <div class="info-item">
          <span class="info-label">Company</span>
          <span class="info-value">${lead.company}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Project Type</span>
          <span class="info-value">${projectLabel}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Budget Range</span>
          <span class="info-value">${lead.budget}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Submitted At</span>
          <span class="info-value" style="font-size: 14px; font-weight: 400;">${createdAt}</span>
        </div>
      </div>
      
      <div class="message-box">
        <span class="info-label">Project Details / Message</span>
        <span class="info-value">${lead.message}</span>
      </div>
      
      <div class="action-buttons">
        <a href="mailto:${lead.email}" class="action-button primary">Reply to Lead</a>
        <a href="https://supabase.com/dashboard/project/_/editor" class="action-button secondary">View in Supabase</a>
      </div>
    </div>
    <div class="footer">
      <p><strong>Silex Digital Lead Capture System</strong></p>
      <p>This email was automatically generated. Do not reply to this email.</p>
      <p style="font-size: 12px; margin-top: 16px;">
        Generated at ${new Date().toISOString()}
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Create plain text version of confirmation email
 */
export function createConfirmationEmailText(
  name: string,
  email: string,
  projectType: string
): string {
  const projectLabel = projectTypeLabels[projectType] ?? projectType;

  return `
Благодарим ви! 🎉

Здравейте, ${name}!

Благодарим ви за проявения интерес към нашите услуги. Получихме вашето запитване за ${projectLabel} проект.

Детайли:
- Имейл: ${email}
- Тип проект: ${projectLabel}

Нашият екип ще прегледа вашето запитване и ще се свърже с вас в рамките на 24 работни часа.

Ако имате въпроси или искате да добавите допълнителна информация, не се колебайте да ни пишете на info@silexdigital.com

С уважение,
Екипът на Silex Digital
  `.trim();
}

/**
 * Create plain text version of notification email
 */
export function createNotificationEmailText(lead: Lead): string {
  const projectLabel = projectTypeLabels[lead.projectType] ?? lead.projectType;
  const createdAt = new Date(lead.createdAt).toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
  });

  return `
🎯 NEW LEAD RECEIVED

Lead Information
===============
Lead ID: ${lead.id}
Status: ${lead.status.toUpperCase()}
Full Name: ${lead.name}
Email: ${lead.email}
Company: ${lead.company}
Project Type: ${projectLabel}
Budget Range: ${lead.budget}
Submitted At: ${createdAt}

Project Details / Message
-------------------------
${lead.message}

Quick Actions:
--------------
Reply to Lead: mailto:${lead.email}
View in Supabase: https://supabase.com/dashboard/project/_/editor

---
Silex Digital Lead Capture System
This email was automatically generated. Do not reply to this email.
Generated at ${new Date().toISOString()}
  `.trim();
}
