import { NextResponse } from 'next/server';
import { requireAdminAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

interface DemoEventRow {
  event: string;
  demo_id: string;
  locale: string;
  metadata: Record<string, string | number | boolean>;
  created_at: string;
}

export async function GET() {
  try {
    await requireAdminAuth();

    if (!supabase) {
      return NextResponse.json({
        summary: {
          totalEvents: 0,
          byEvent: {},
          byDemo: {},
        },
        recent: [],
      });
    }

    const { data, error } = await supabase
      .from('demo_events')
      .select('event, demo_id, locale, metadata, created_at')
      .order('created_at', { ascending: false })
      .limit(200);

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch demo events' },
        { status: 500 },
      );
    }

    const rows = (data ?? []) as DemoEventRow[];

    const byEvent: Record<string, number> = {};
    const byDemo: Record<string, number> = {};

    rows.forEach((row) => {
      byEvent[row.event] = (byEvent[row.event] ?? 0) + 1;
      byDemo[row.demo_id] = (byDemo[row.demo_id] ?? 0) + 1;
    });

    return NextResponse.json({
      summary: {
        totalEvents: rows.length,
        byEvent,
        byDemo,
      },
      recent: rows.slice(0, 25),
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
