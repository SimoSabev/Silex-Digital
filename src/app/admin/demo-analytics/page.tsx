'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart3, Activity, RefreshCw } from 'lucide-react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import Button from '@/components/ui/Button';

interface AnalyticsResponse {
  summary: {
    totalEvents: number;
    byEvent: Record<string, number>;
    byDemo: Record<string, number>;
  };
  recent: Array<{
    event: string;
    demo_id: string;
    locale: string;
    metadata: Record<string, string | number | boolean>;
    created_at: string;
  }>;
}

export default function DemoAnalyticsPage() {
  const router = useRouter();
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/demo-events');
      if (response.ok) {
        const payload = (await response.json()) as AnalyticsResponse;
        setData(payload);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  const eventItems = useMemo(
    () => Object.entries(data?.summary.byEvent ?? {}).sort((a, b) => b[1] - a[1]),
    [data],
  );

  const demoItems = useMemo(
    () => Object.entries(data?.summary.byDemo ?? {}).sort((a, b) => b[1] - a[1]),
    [data],
  );

  const handleLogout = () => {
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div>
      <AdminHeader title='Demo Analytics' onLogout={handleLogout} />

      <div className='mb-6 flex items-center justify-between'>
        <div>
          <h2 className='text-foreground text-lg font-semibold'>Demo funnel insights</h2>
          <p className='text-muted-foreground text-sm'>
            Event stream from interactive demos (view, simulate, compare, CTA)
          </p>
        </div>
        <Button variant='outline' size='sm' onClick={loadData} isLoading={loading}>
          <RefreshCw className='mr-2 h-4 w-4' />
          Refresh
        </Button>
      </div>

      <div className='mb-8 grid grid-cols-1 gap-4 md:grid-cols-3'>
        <div className='bg-card border-border rounded-xl border p-5'>
          <div className='mb-2 flex items-center gap-2 text-sm text-zinc-400'>
            <Activity className='h-4 w-4' />
            Total Events
          </div>
          <p className='text-3xl font-bold text-white'>{data?.summary.totalEvents ?? 0}</p>
        </div>

        <div className='bg-card border-border rounded-xl border p-5 md:col-span-2'>
          <div className='mb-2 flex items-center gap-2 text-sm text-zinc-400'>
            <BarChart3 className='h-4 w-4' />
            Top Events
          </div>
          <div className='flex flex-wrap gap-2'>
            {eventItems.length === 0 ? (
              <span className='text-sm text-zinc-500'>No event data yet</span>
            ) : (
              eventItems.map(([key, value]) => (
                <span
                  key={key}
                  className='rounded-full border border-(--violet)/30 bg-(--violet)/10 px-3 py-1 text-xs text-(--violet)'
                >
                  {key}: {value}
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      <div className='mb-8 grid grid-cols-1 gap-4 md:grid-cols-2'>
        <div className='bg-card border-border rounded-xl border p-5'>
          <h3 className='mb-3 text-sm font-semibold text-white'>Events by Demo</h3>
          <div className='space-y-2'>
            {demoItems.length === 0 ? (
              <p className='text-sm text-zinc-500'>No demo activity yet</p>
            ) : (
              demoItems.map(([demoId, count]) => (
                <div key={demoId} className='flex items-center justify-between text-sm'>
                  <span className='text-zinc-300'>{demoId}</span>
                  <span className='font-semibold text-(--violet)'>{count}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className='bg-card border-border rounded-xl border p-5'>
          <h3 className='mb-3 text-sm font-semibold text-white'>Recent Events</h3>
          <div className='max-h-64 space-y-2 overflow-auto'>
            {(data?.recent ?? []).length === 0 ? (
              <p className='text-sm text-zinc-500'>No recent events</p>
            ) : (
              (data?.recent ?? []).map((event, index) => (
                <div key={`${event.created_at}-${index}`} className='rounded-lg border border-white/10 p-2 text-xs'>
                  <div className='flex items-center justify-between gap-2'>
                    <span className='font-semibold text-zinc-200'>{event.event}</span>
                    <span className='text-zinc-500'>{new Date(event.created_at).toLocaleString()}</span>
                  </div>
                  <div className='mt-1 text-zinc-400'>
                    {event.demo_id} | {event.locale}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
