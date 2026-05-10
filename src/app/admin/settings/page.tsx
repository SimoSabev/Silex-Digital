'use client';

import { useRouter } from 'next/navigation';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { User, Shield, Bell, Database } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function AdminSettingsPage() {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/admin/login');
    router.refresh();
  };

  const settingsSections = [
    {
      title: 'Profile',
      description: 'Manage your admin profile and preferences',
      icon: User,
      items: [
        { label: 'Name', value: 'Admin User', type: 'text' },
        { label: 'Email', value: 'admin@silexbrand.com', type: 'email' },
      ],
    },
    {
      title: 'Security',
      description: 'Manage your account security settings',
      icon: Shield,
      items: [
        { label: 'Change Password', value: '', type: 'button', action: 'Change Password' },
        { label: 'Two-Factor Authentication', value: 'Disabled', type: 'status' },
      ],
    },
    {
      title: 'Notifications',
      description: 'Configure your notification preferences',
      icon: Bell,
      items: [
        { label: 'Email Notifications', value: 'Enabled', type: 'toggle' },
        { label: 'Lead Alerts', value: 'Enabled', type: 'toggle' },
      ],
    },
    {
      title: 'Data',
      description: 'Manage your data and integrations',
      icon: Database,
      items: [
        { label: 'Export Leads', value: '', type: 'button', action: 'Export CSV' },
        { label: 'Export Blog Posts', value: '', type: 'button', action: 'Export JSON' },
      ],
    },
  ];

  return (
    <div>
      <AdminHeader title="Settings" onLogout={handleLogout} />

      <div className="space-y-6">
        {settingsSections.map((section) => (
          <div key={section.title} className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <section.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">{section.title}</h2>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </div>
            </div>

            <div className="space-y-4">
              {section.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0"
                >
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                  
                  {item.type === 'text' || item.type === 'email' ? (
                    <span className="text-sm text-muted-foreground">{item.value}</span>
                  ) : item.type === 'button' ? (
                    <Button variant="outline" size="sm">
                      {item.action}
                    </Button>
                  ) : item.type === 'status' ? (
                    <span className="text-sm text-muted-foreground">{item.value}</span>
                  ) : item.type === 'toggle' ? (
                    <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-colors">
                      <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
                    </button>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={() => alert('Settings saved!')}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
