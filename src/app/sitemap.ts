import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const base = "https://nikorych.dev/";
export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{ url: base, lastModified: new Date(), priority: 1 },
		{ url: `${base}/loading`, lastModified: new Date(), priority: 0.5 },
		{ url: `${base}/travel`, lastModified: new Date(), priority: 0.5 },
		{ url: `${base}/tahoe`, lastModified: new Date(), priority: 0.8 },
		{ url: `${base}/room`, lastModified: new Date(), priority: 0.8 }
	];
}
