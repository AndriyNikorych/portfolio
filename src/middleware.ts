import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "uk"];
const defaultLocale = "en";

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const hasLocale = locales.some((lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`);
	if (hasLocale) return;

	const referer = request.headers.get("referer");
	const refererLocale = referer
		? locales.find((lang) => {
				const refPath = new URL(referer).pathname;
				return refPath.startsWith(`/${lang}/`) || refPath === `/${lang}`;
			})
		: undefined;

	const locale = refererLocale || request.cookies.get("locale")?.value || defaultLocale;

	if (pathname === "/") {
		const response = NextResponse.rewrite(new URL(`/${locale}${pathname}`, request.url));
		response.headers.set("Cache-Control", "public, max-age=0, must-revalidate");
		return response;
	}

	const response = NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
	response.headers.set("Cache-Control", "public, max-age=0, must-revalidate");
	return response;
}

export const config = { matcher: ["/((?!_next|images|lottie|locales|favicon.ico).*)"] };
