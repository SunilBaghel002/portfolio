// app/sitemap.ts
import { MetadataRoute } from "next";

const BASE_URL = "http://localhost:3000"; // Replace with your domain

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Static routes
  const staticRoutes = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/skills`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    },
  ];

  // You can add dynamic routes here (e.g., blog posts, project pages)
  // const projects = await getProjects();
  // const projectRoutes = projects.map(project => ({
  //   url: `${BASE_URL}/projects/${project.slug}`,
  //   lastModified: project.updatedAt,
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.8,
  // }));

  return [...staticRoutes];
}
