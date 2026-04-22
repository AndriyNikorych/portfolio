import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const base = "https://andriynikorych.github.io/portfolio";
export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{ url: base, lastModified: new Date(), priority: 1 },
		{ url: `${base}/loading`, lastModified: new Date(), priority: 0.5 },
		{ url: `${base}/tahoe`, lastModified: new Date(), priority: 0.8 }
	];
}
