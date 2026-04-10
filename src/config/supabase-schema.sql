-- ============================================
-- Silex Digital Lead Capture System
-- Supabase Database Schema
-- ============================================
-- Run this SQL in your Supabase SQL Editor to create the leads table
-- ============================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- Create leads table
-- ============================================
CREATE TABLE IF NOT EXISTS leads (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Contact information
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(100) NOT NULL,

  -- Project details
  project_type VARCHAR(50) NOT NULL,
  budget VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,

  -- Status tracking
  status VARCHAR(20) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- Create indexes for performance
-- ============================================

-- Index on email for quick lookups and duplicate checks
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);

-- Index on status for filtering leads by status
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);

-- Index on created_at for sorting and time-based queries
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);

-- Index on company for company-based searches
CREATE INDEX IF NOT EXISTS idx_leads_company ON leads(company);

-- Index on project_type for analytics and filtering
CREATE INDEX IF NOT EXISTS idx_leads_project_type ON leads(project_type);

-- Composite index for common dashboard queries (status + created_at)
CREATE INDEX IF NOT EXISTS idx_leads_status_created_at ON leads(status, created_at DESC);

-- ============================================
-- Create function to automatically update updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- Create trigger to auto-update updated_at
-- ============================================
DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Add comments for documentation
-- ============================================

COMMENT ON TABLE leads IS 'Stores lead submissions from the contact form';

COMMENT ON COLUMN leads.id IS 'Unique identifier for each lead (UUID)';

COMMENT ON COLUMN leads.name IS 'Full name of the lead contact person';

COMMENT ON COLUMN leads.email IS 'Email address of the lead contact person';

COMMENT ON COLUMN leads.company IS 'Company or organization name';

COMMENT ON COLUMN leads.project_type IS 'Type of project (seo, ecommerce, custom-platform, web-development, other)';

COMMENT ON COLUMN leads.budget IS 'Budget range for the project (5k-10k, 10k-25k, 25k-50k, 50k-100k, 100k+)';

COMMENT ON COLUMN leads.message IS 'Detailed message or project description from the lead';

COMMENT ON COLUMN leads.status IS 'Current status of the lead in the sales pipeline (new, contacted, qualified, converted, lost)';

COMMENT ON COLUMN leads.created_at IS 'Timestamp when the lead was first submitted';

COMMENT ON COLUMN leads.updated_at IS 'Timestamp when the lead was last modified';

-- ============================================
-- Row Level Security (RLS) Policies
-- ============================================

-- Enable RLS on the leads table
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public to insert new leads (for the contact form)
CREATE POLICY "Allow public insert on leads"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow authenticated users to read leads (for admin dashboard)
-- NOTE: In production, you should restrict this to specific roles
CREATE POLICY "Allow authenticated select on leads"
  ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow authenticated users to update leads (for admin dashboard)
-- NOTE: In production, you should restrict this to specific roles
CREATE POLICY "Allow authenticated update on leads"
  ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Allow authenticated users to delete leads (for admin dashboard)
-- NOTE: In production, you should restrict this to specific roles
CREATE POLICY "Allow authenticated delete on leads"
  ON leads
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================
-- Useful Queries for Testing and Analytics
-- ============================================

-- View all leads ordered by most recent
-- SELECT * FROM leads ORDER BY created_at DESC;

-- Count leads by status
-- SELECT status, COUNT(*) as count FROM leads GROUP BY status ORDER BY count DESC;

-- Count leads by project type
-- SELECT project_type, COUNT(*) as count FROM leads GROUP BY project_type ORDER BY count DESC;

-- Count leads by budget range
-- SELECT budget, COUNT(*) as count FROM leads GROUP BY budget ORDER BY count DESC;

-- Get leads from the last 7 days
-- SELECT * FROM leads WHERE created_at >= NOW() - INTERVAL '7 days' ORDER BY created_at DESC;

-- Get leads from the last 30 days
-- SELECT * FROM leads WHERE created_at >= NOW() - INTERVAL '30 days' ORDER BY created_at DESC;

-- ============================================
-- Optional: Create a view for lead statistics
-- ============================================

CREATE OR REPLACE VIEW lead_stats AS
SELECT
  COUNT(*) as total_leads,
  COUNT(*) FILTER (WHERE status = 'new') as new_leads,
  COUNT(*) FILTER (WHERE status = 'contacted') as contacted_leads,
  COUNT(*) FILTER (WHERE status = 'qualified') as qualified_leads,
  COUNT(*) FILTER (WHERE status = 'converted') as converted_leads,
  COUNT(*) FILTER (WHERE status = 'lost') as lost_leads,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as leads_last_7_days,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as leads_last_30_days
FROM leads;

COMMENT ON VIEW lead_stats IS 'Aggregated statistics for leads dashboard';

-- ============================================
-- End of Schema
-- ============================================
