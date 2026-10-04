import type { MetadataRoute } from "next";
import { SITE } from "@/lib/data/site";
import { getAllBlogPosts } from "@/lib/blog";
import { PORTFOLIO_ITEMS } from "@/lib/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/portfolio`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE.url}/blog`, changeFrequency: "weekly", priority: 0.8 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const portfolioRoutes: MetadataRoute.Sitemap = PORTFOLIO_ITEMS.map((item) => ({
    url: `${SITE.url}/portfolio#${item.slug}`,
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  return [...staticRoutes, ...blogRoutes, ...portfolioRoutes];
}
