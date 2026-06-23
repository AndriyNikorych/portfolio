import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	trailingSlash: true,
	experimental: {
		optimizeCss: true
	},
	headers: async () => [
		{
			source: "/:path*",
			headers: [
				{
					key: "Cache-Control",
					value: "public, max-age=0, must-revalidate"
				}
			]
		}
	],
	turbopack: {
		rules: {
			"*.svg": {
				loaders: ["@svgr/webpack"],
				as: "*.js"
			}
		}
	}
};

export default nextConfig;
