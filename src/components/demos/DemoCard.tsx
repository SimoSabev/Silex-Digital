"use client";

import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";

interface DemoCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  stats?: { label: string; value: string };
  color?: "blue" | "green" | "orange" | "purple";
}

const colorStyles = {
  blue: {
    bg: "bg-[var(--accent)]/10",
    border: "border-[var(--accent)]/20 hover:border-[var(--accent)]/40",
    icon: "text-[var(--accent)]",
    accent: "group-hover:bg-[var(--accent)]/10",
  },
  green: {
    bg: "bg-[var(--accent)]/10",
    border: "border-[var(--accent)]/20 hover:border-[var(--accent)]/40",
    icon: "text-[var(--accent)]",
    accent: "group-hover:bg-[var(--accent)]/10",
  },
  orange: {
    bg: "bg-[var(--accent)]/10",
    border: "border-[var(--accent)]/20 hover:border-[var(--accent)]/40",
    icon: "text-[var(--accent)]",
    accent: "group-hover:bg-[var(--accent)]/10",
  },
  purple: {
    bg: "bg-[var(--accent)]/10",
    border: "border-[var(--accent)]/20 hover:border-[var(--accent)]/40",
    icon: "text-[var(--accent)]",
    accent: "group-hover:bg-[var(--accent)]/10",
  },
};

export default function DemoCard({
  title,
  description,
  href,
  icon,
  stats,
  color = "blue",
}: DemoCardProps) {
  const colors = colorStyles[color];

  return (
    <Link href={href}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={`group relative rounded-[24px] border p-6 ${colors.border} bg-linear-to-br from-[var(--bg-card)] to-transparent transition-all duration-300`}
      >
        {/* Icon */}
        <div
          className={`h-12 w-12 rounded-xl ${colors.bg} flex items-center justify-center ${colors.icon} mb-4`}
        >
          {icon}
        </div>

        {/* Content */}
        <h3 className="mb-2 text-lg font-semibold text-[var(--text-main)] transition-colors group-hover:text-[var(--accent)]">
          {title}
        </h3>
        <p className="mb-4 text-sm text-[var(--text-sub)]">{description}</p>

        {/* Stats */}
        {stats && (
          <div className="mb-4 flex items-center gap-4">
            <div className="text-2xl font-bold text-[var(--text-main)]">{stats.value}</div>
            <div className="text-xs text-[var(--text-muted)]">{stats.label}</div>
          </div>
        )}

        {/* CTA */}
        <div
          className={`flex items-center gap-2 text-sm font-medium ${colors.icon} transition-colors`}
        >
          <span className="transition-transform group-hover:translate-x-1">
            View demo
          </span>
          <ArrowRight className="h-4 w-4" />
        </div>

        {/* Play button overlay */}
        <div
          className={`absolute top-4 right-4 h-8 w-8 rounded-full ${colors.bg} flex items-center justify-center ${colors.icon} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
        >
          <Play className="ml-0.5 h-3 w-3" />
        </div>
      </motion.div>
    </Link>
  );
}
