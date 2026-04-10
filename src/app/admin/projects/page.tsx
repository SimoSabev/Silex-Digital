'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ProjectList, type Project } from '@/components/admin/ProjectList';
import { Plus, RefreshCw } from 'lucide-react';
import Button from '@/components/ui/Button';

// Sample projects data - in production, this would come from a database or config file
const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'A modern e-commerce platform built with Next.js and Stripe integration.',
    imageUrl: '/images/projects/ecommerce.jpg',
    liveUrl: 'https://example.com',
    category: 'E-commerce',
    tags: ['Next.js', 'Stripe', 'TypeScript'],
    featured: true,
  },
  {
    id: '2',
    title: 'SaaS Dashboard',
    description: 'Analytics dashboard for a SaaS application with real-time data visualization.',
    imageUrl: '/images/projects/dashboard.jpg',
    liveUrl: 'https://example.com',
    category: 'SaaS',
    tags: ['React', 'D3.js', 'Node.js'],
    featured: false,
  },
  {
    id: '3',
    title: 'Corporate Website',
    description: 'Professional corporate website with CMS integration.',
    imageUrl: '/images/projects/corporate.jpg',
    liveUrl: 'https://example.com',
    category: 'Website',
    tags: ['WordPress', 'PHP', 'MySQL'],
    featured: true,
  },
];

export default function ProjectsManagementPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>(sampleProjects);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter((project) => project.id !== projectId));
  };

  const handleToggleFeatured = (projectId: string) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId
          ? { ...project, featured: !project.featured }
          : project
      )
    );
  };

  const handleLogout = () => {
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div>
      <AdminHeader title="Projects Management" onLogout={handleLogout} />

      {/* Header Actions */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-muted-foreground">
          {projects.length} {projects.length === 1 ? 'project' : 'projects'}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => setIsLoading(false), 1000);
            }}
            isLoading={isLoading}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button
            onClick={() => {
              alert('Add project functionality coming soon! For now, please manually add projects to your portfolio.');
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </div>
      </div>

      {/* Projects List */}
      <ProjectList
        projects={projects}
        onDeleteProject={handleDeleteProject}
        onToggleFeatured={handleToggleFeatured}
      />
    </div>
  );
}
