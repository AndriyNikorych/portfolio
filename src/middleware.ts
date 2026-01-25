import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/locale/i18n/request";

export default createMiddleware({
	locales,
	defaultLocale,
	localePrefix: "always",
	localeDetection: true
});

export const config = {
	matcher: ["/((?!api|_next|.*\\..*).*)"]
};
