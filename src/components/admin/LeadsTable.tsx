'use client';

import { useState } from 'react';
import type { Lead, LeadStatus } from '@/types/lead';
import {
  MoreVertical,
  Eye,
  Trash2,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';

interface LeadsTableProps {
  leads: Lead[];
  onViewLead: (lead: Lead) => void;
  onDeleteLead: (leadId: string) => void;
  onUpdateStatus: (leadId: string, status: LeadStatus) => void;
}

const statusConfig = {
  new: { label: 'New', color: 'bg-[var(--violet)]/10 text-[var(--violet)] border-[var(--violet)]/20' },
  contacted: { label: 'Contacted', color: 'bg-[var(--color-accent-amber)]/10 text-[var(--color-accent-amber)] border-[var(--color-accent-amber)]/20' },
  qualified: { label: 'Qualified', color: 'bg-[var(--violet)]/10 text-[var(--violet)] border-[var(--violet)]/20' },
  converted: { label: 'Converted', color: 'bg-[var(--lime)]/10 text-[var(--lime)] border-[var(--lime)]/20' },
  lost: { label: 'Lost', color: 'bg-[var(--coral)]/10 text-[var(--coral)] border-[var(--coral)]/20' },
};

export function LeadsTable({ 
  leads, 
  onViewLead, 
  onDeleteLead, 
  onUpdateStatus 
}: LeadsTableProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-4 px-4 font-medium text-muted-foreground">
              Name
            </th>
            <th className="text-left py-4 px-4 font-medium text-muted-foreground">
              Email
            </th>
            <th className="text-left py-4 px-4 font-medium text-muted-foreground">
              Company
            </th>
            <th className="text-left py-4 px-4 font-medium text-muted-foreground">
              Project Type
            </th>
            <th className="text-left py-4 px-4 font-medium text-muted-foreground">
              Budget
            </th>
            <th className="text-left py-4 px-4 font-medium text-muted-foreground">
              Status
            </th>
            <th className="text-left py-4 px-4 font-medium text-muted-foreground">
              Date
            </th>
            <th className="text-right py-4 px-4 font-medium text-muted-foreground">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-b border-border hover:bg-card/50 transition-colors">
              <td className="py-4 px-4">
                <span className="font-medium text-foreground">{lead.name}</span>
              </td>
              <td className="py-4 px-4">
                <span className="text-muted-foreground">{lead.email}</span>
              </td>
              <td className="py-4 px-4">
                <span className="text-muted-foreground">{lead.company}</span>
              </td>
              <td className="py-4 px-4">
                <span className="text-muted-foreground">{lead.projectType}</span>
              </td>
              <td className="py-4 px-4">
                <span className="text-muted-foreground">{lead.budget}</span>
              </td>
              <td className="py-4 px-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusConfig[lead.status].color}`}>
                  {statusConfig[lead.status].label}
                </span>
              </td>
              <td className="py-4 px-4">
                <span className="text-muted-foreground">{formatDate(lead.createdAt)}</span>
              </td>
              <td className="py-4 px-4">
                <div className="relative">
                  <button
                    onClick={() => setOpenMenuId(openMenuId === lead.id ? null : lead.id)}
                    className="p-2 hover:bg-card rounded-lg transition-colors"
                  >
                    <MoreVertical className="w-4 h-4 text-muted-foreground" />
                  </button>

                  {openMenuId === lead.id && (
                    <div className="absolute right-0 top-full mt-1 w-48 bg-card border border-border rounded-lg shadow-lg z-10">
                      <button
                        onClick={() => {
                          onViewLead(lead);
                          setOpenMenuId(null);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-card/50 text-sm text-foreground"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                      <div className="border-t border-border" />
                      <button
                        onClick={() => {
                          onUpdateStatus(lead.id, 'contacted');
                          setOpenMenuId(null);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-card/50 text-sm text-foreground"
                      >
                        <Clock className="w-4 h-4 text-[var(--color-accent-amber)]" />
                        Mark Contacted
                      </button>
                      <button
                        onClick={() => {
                          onUpdateStatus(lead.id, 'qualified');
                          setOpenMenuId(null);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-card/50 text-sm text-foreground"
                      >
                        <CheckCircle className="w-4 h-4 text-[var(--violet)]" />
                        Mark Qualified
                      </button>
                      <button
                        onClick={() => {
                          onUpdateStatus(lead.id, 'converted');
                          setOpenMenuId(null);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-card/50 text-sm text-foreground"
                      >
                        <CheckCircle className="w-4 h-4 text-[var(--lime)]" />
                        Mark Converted
                      </button>
                      <button
                        onClick={() => {
                          onUpdateStatus(lead.id, 'lost');
                          setOpenMenuId(null);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-card/50 text-sm text-foreground"
                      >
                        <XCircle className="w-4 h-4 text-[var(--coral)]" />
                        Mark Lost
                      </button>
                      <div className="border-t border-border" />
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this lead?')) {
                            onDeleteLead(lead.id);
                            setOpenMenuId(null);
                          }
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-destructive/10 text-sm text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {leads.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No leads found</p>
        </div>
      )}
    </div>
  );
}
