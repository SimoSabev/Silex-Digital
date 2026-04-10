'use client';

import { useState } from 'react';
import {
  MoreVertical,
  Trash2,
  Edit,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  liveUrl?: string;
  category: string;
  tags: string[];
  featured?: boolean;
}

interface ProjectListProps {
  projects: Project[];
  onDeleteProject: (projectId: string) => void;
  onToggleFeatured?: (projectId: string) => void;
}

export function ProjectList({ 
  projects, 
  onDeleteProject,
  onToggleFeatured 
}: ProjectListProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
        >
          {project.imageUrl && (
            <div className="aspect-video bg-muted relative">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              {project.featured && (
                <span className="absolute top-2 right-2 px-2 py-1 bg-primary text-primary-foreground text-xs rounded">
                  Featured
                </span>
              )}
            </div>
          )}
          
          <div className="p-4">
            <h3 className="font-semibold text-foreground mb-2">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground capitalize">
                {project.category}
              </span>
              
              <div className="relative">
                <button
                  onClick={() => setOpenMenuId(openMenuId === project.id ? null : project.id)}
                  className="p-2 hover:bg-card rounded-lg transition-colors"
                >
                  <MoreVertical className="w-4 h-4 text-muted-foreground" />
                </button>

                {openMenuId === project.id && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-card border border-border rounded-lg shadow-lg z-10">
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setOpenMenuId(null)}
                        className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-card/50 text-sm text-foreground"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Live
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        // TODO: Implement edit functionality
                        setOpenMenuId(null);
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-card/50 text-sm text-foreground"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Project
                    </button>
                    {onToggleFeatured && (
                      <button
                        onClick={() => {
                          onToggleFeatured(project.id);
                          setOpenMenuId(null);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-card/50 text-sm text-foreground"
                      >
                        {project.featured ? 'Unfeature' : 'Feature'}
                      </button>
                    )}
                    <div className="border-t border-border" />
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this project?')) {
                          onDeleteProject(project.id);
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
            </div>
          </div>
        </div>
      ))}

      {projects.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-muted-foreground">No projects found</p>
        </div>
      )}
    </div>
  );
}
