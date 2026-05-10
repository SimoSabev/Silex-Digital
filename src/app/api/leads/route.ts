import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';
import { resend, FROM_EMAIL, ADMIN_EMAIL } from '@/lib/resend';
import {
  createConfirmationEmail,
  createConfirmationEmailText,
  createNotificationEmail,
  createNotificationEmailText,
} from '@/lib/email-templates';
import type { Lead } from '@/types/lead';

/**
 * Supabase lead record type (snake_case)
 */
interface SupabaseLead {
  id: string;
  name: string;
  email: string;
  company: string;
  project_type: string;
  budget: string;
  message: string;
  status: Lead['status'];
  created_at: string;
  updated_at: string;
}

/**
 * Zod schema for lead form validation
 */
const leadFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().min(2, 'Company name must be at least 2 characters').max(100),
  projectType: z.string().min(1, 'Please select a project type'),
  budget: z.string().min(1, 'Please select a budget range'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

/**
 * POST /api/leads
 * Handle lead form submissions
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = (await request.json()) as Record<string, unknown>;
    const validationResult = leadFormSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(
        (error) => `${error.path.join('.')}: ${error.message}`
      );
      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Generate a unique ID for the lead
    const leadId = crypto.randomUUID();

    // Prepare lead data for Supabase
    const now = new Date().toISOString();
    const leadData = {
      id: leadId,
      name: data.name,
      email: data.email,
      company: data.company,
      project_type: data.projectType,
      budget: data.budget,
      message: data.message,
      status: 'new',
      created_at: now,
      updated_at: now,
    };

    // Store lead in Supabase
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      );
    }

    const { error: supabaseError } = await supabase
      .from('leads')
      .insert(leadData);

    if (supabaseError) {
      console.error('Supabase error:', supabaseError);
      return NextResponse.json(
        { error: 'Failed to store lead data', details: supabaseError.message },
        { status: 500 }
      );
    }

    // Create lead object for email templates
    const lead: Lead = {
      id: leadId,
      name: data.name,
      email: data.email,
      company: data.company,
      projectType: data.projectType,
      budget: data.budget,
      message: data.message,
      status: 'new',
      createdAt: now,
      updatedAt: now,
    };

    // Send confirmation email to the submitter
    try {
      await resend?.emails.send({
        from: FROM_EMAIL,
        to: data.email,
        subject: 'Благодарим ви за вашето запитване | SilexBrand',
        html: createConfirmationEmail(data.name, data.email, data.projectType),
        text: createConfirmationEmailText(data.name, data.email, data.projectType),
      });
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Don't fail the request if email fails, just log it
    }

    // Send notification email to admin
    try {
      await resend?.emails.send({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `🎯 New Lead: ${data.name} - ${data.company}`,
        html: createNotificationEmail(lead),
        text: createNotificationEmailText(lead),
        replyTo: data.email,
      });
    } catch (emailError) {
      console.error('Failed to send notification email:', emailError);
      // Don't fail the request if email fails, just log it
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Lead submitted successfully',
        leadId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/leads
 * Optional: Retrieve leads (for admin purposes)
 * Note: This should be protected with authentication in production
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') ?? '50');
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const status = searchParams.get('status');

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      );
    }

    let query = supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to retrieve leads', details: error.message },
        { status: 500 }
      );
    }

    // Transform snake_case to camelCase
    const leads: Lead[] = (data ?? []).map((lead: SupabaseLead) => ({
      id: lead.id,
      name: lead.name,
      email: lead.email,
      company: lead.company,
      projectType: lead.project_type,
      budget: lead.budget,
      message: lead.message,
      status: lead.status,
      createdAt: lead.created_at,
      updatedAt: lead.updated_at,
    }));

    return NextResponse.json({ leads });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
