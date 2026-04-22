import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
	if (process.env.NEXT_PUBLIC_IS_PRODUCTION) {
		return {
			rules: {
				userAgent: "*",
				allow: "/"
			},
			sitemap: `${process.env.NEXT_PUBLIC_TARGET_ORIGIN}/sitemap.xml`
		};
	}
	return {
		rules: {
			userAgent: "*",
			disallow: "/"
		}
	};
}
