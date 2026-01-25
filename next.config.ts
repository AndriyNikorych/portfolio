import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/locale/i18n/request.ts");

const repo = "portfolio";

const nextConfig: NextConfig = {
	output: "export",
	basePath: `/${repo}`,
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

export default withNextIntl(nextConfig);
