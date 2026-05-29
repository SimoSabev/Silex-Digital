import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl,                        lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${baseUrl}/services`,          lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/pricing`,           lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/demos`,             lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact`,           lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/demos/email-automation`,    lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/demos/lead-qualification`,  lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/demos/chatbot`,             lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  return staticPages;
}
