export type OpenWeatherCurrent = {
	name: string;
	dt: number;
	timezone: number;
	sys: { sunrise: number; sunset: number; country: string };
	main: { temp: number; feels_like: number; humidity: number };
	wind: { speed: number };
	weather: Array<{ description: string; icon: string; main: string }>;
};

function getApiKey() {
	const key = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
	if (!key) throw new Error("Missing NEXT_PUBLIC_OPENWEATHER_API_KEY");
	return key;
}

export async function fetchCurrentWeather(params: {
	lat: number;
	lon: number;
	lang?: string; // "en" | "uk"
	units?: "metric" | "imperial";
}): Promise<OpenWeatherCurrent> {
	const { lat, lon, lang = "en", units = "metric" } = params;

	const url = new URL("https://api.openweathermap.org/data/2.5/weather");
	url.searchParams.set("lat", String(lat));
	url.searchParams.set("lon", String(lon));
	url.searchParams.set("appid", getApiKey());
	url.searchParams.set("units", units);
	url.searchParams.set("lang", lang);

	const res = await fetch(url.toString());
	if (!res.ok) {
		const text = await res.text().catch(() => "");
		throw new Error(`OpenWeather error: ${res.status} ${text}`);
	}

	return (await res.json()) as OpenWeatherCurrent;
}

export function openWeatherIconUrl(icon: string) {
	return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

export function formatUnixTime(unixSeconds: number, locale: string) {
	return new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit" }).format(
		new Date(unixSeconds * 1000)
	);
}
