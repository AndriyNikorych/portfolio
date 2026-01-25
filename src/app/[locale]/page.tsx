import { Home } from "@/app/home/Home";
import { locales } from "@/locale/i18n/request";

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

export default function Page() {
	return <Home />;
}
