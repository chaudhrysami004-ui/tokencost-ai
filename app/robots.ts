import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://tokencost-ai.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"], // API endpoints ko search crawl se bachata hai
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}