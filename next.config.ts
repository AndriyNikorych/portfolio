import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repo = isProd ? "portfolio" : "";

const nextConfig: NextConfig = {
	output: "export",
	basePath: repo ? `/${repo}` : "",
	images: { unoptimized: true },
	trailingSlash: true,
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
