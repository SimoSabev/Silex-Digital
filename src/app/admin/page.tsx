"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Lead, LeadStatus } from "@/types/lead";
import { StatCard } from "@/components/admin/StatCard";
import { LeadsTable } from "@/components/admin/LeadsTable";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Users, TrendingUp, FileText, ArrowRight, Plus } from "lucide-react";
import Button from "@/components/ui/Button";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    void fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await fetch("/api/admin/leads?limit=5");
      const data = (await response.json()) as { leads: Lead[] };
      if (response.ok) {
        setLeads(data.leads);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewLead = (lead: Lead) => {
    setSelectedLead(lead);
  };

  const handleDeleteLead = async (leadId: string) => {
    try {
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setLeads(leads.filter((lead) => lead.id !== leadId));
      }
    } catch (error) {
      console.error("Error deleting lead:", error);
    }
  };

  const handleUpdateStatus = async (leadId: string, status: LeadStatus) => {
    try {
      const response = await fetch(`/api/admin/leads/${leadId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        setLeads(
          leads.map((lead) =>
            lead.id === leadId ? { ...lead, status } : lead,
          ),
        );
      }
    } catch (error) {
      console.error("Error updating lead status:", error);
    }
  };

  const handleLogout = () => {
    router.push("/admin/login");
    router.refresh();
  };

  // Calculate statistics
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "new").length;
  const convertedLeads = leads.filter((l) => l.status === "converted").length;
  const totalProjects = 12; // Placeholder

  return (
    <div>
      <AdminHeader title="Dashboard" onLogout={handleLogout} />

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Leads" value={totalLeads} icon={Users} />
        <StatCard title="Projects" value={totalProjects} icon={FileText} />
        <StatCard
          title="Converted"
          value={convertedLeads}
          change="+5% from last week"
          changeType="positive"
          icon={TrendingUp}
        />
        <StatCard title="New Leads" value={newLeads} icon={TrendingUp} />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-foreground mb-4 text-lg font-semibold">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Button
            variant="outline"
            className="group flex h-auto items-center justify-between py-4"
            onClick={() => router.push("/admin/blog/new")}
          >
            <div className="flex items-center gap-3">
              <Plus className="text-primary h-5 w-5" />
              <span className="font-medium">Create New Blog Post</span>
            </div>
            <ArrowRight className="text-muted-foreground group-hover:text-foreground h-4 w-4 transition-colors" />
          </Button>
          <Button
            variant="outline"
            className="group flex h-auto items-center justify-between py-4"
            onClick={() => router.push("/admin/leads")}
          >
            <div className="flex items-center gap-3">
              <Users className="text-primary h-5 w-5" />
              <span className="font-medium">Manage Leads</span>
            </div>
            <ArrowRight className="text-muted-foreground group-hover:text-foreground h-4 w-4 transition-colors" />
          </Button>
          <Button
            variant="outline"
            className="group flex h-auto items-center justify-between py-4"
            onClick={() => router.push("/admin/projects")}
          >
            <div className="flex items-center gap-3">
              <FileText className="text-primary h-5 w-5" />
              <span className="font-medium">Manage Projects</span>
            </div>
            <ArrowRight className="text-muted-foreground group-hover:text-foreground h-4 w-4 transition-colors" />
          </Button>
        </div>
      </div>

      {/* Recent Leads */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-foreground text-lg font-semibold">
            Recent Leads
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/admin/leads")}
          >
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="bg-card border-border overflow-hidden rounded-xl border">
          {isLoading ? (
            <div className="text-muted-foreground p-8 text-center">
              Loading leads...
            </div>
          ) : (
            <LeadsTable
              leads={leads}
              onViewLead={handleViewLead}
              onDeleteLead={handleDeleteLead}
              onUpdateStatus={handleUpdateStatus}
            />
          )}
        </div>
      </div>

      {/* Lead Details Modal */}
      {selectedLead && (
        <div
          className="bg-background/80 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedLead(null)}
        >
          <div
            className="bg-card border-border w-full max-w-lg rounded-xl border p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold">Lead Details</h3>
              <button
                onClick={() => setSelectedLead(null)}
                className="hover:bg-card rounded-lg p-2 transition-colors"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-muted-foreground text-sm">Name</p>
                <p className="font-medium">{selectedLead.name}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Email</p>
                <p className="font-medium">{selectedLead.email}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Company</p>
                <p className="font-medium">{selectedLead.company}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Project Type</p>
                <p className="font-medium">{selectedLead.projectType}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Budget</p>
                <p className="font-medium">{selectedLead.budget}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Message</p>
                <p className="font-medium">{selectedLead.message}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Status</p>
                <p className="font-medium capitalize">{selectedLead.status}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Created At</p>
                <p className="font-medium">
                  {new Date(selectedLead.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
