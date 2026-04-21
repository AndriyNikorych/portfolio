// import useSWR from "swr";
// import css from "@css/component/weather.module.scss";
// import { useGeolocation } from "@/hooks/useGeolocation";
// import { fetchCurrentWeather, formatUnixTime, openWeatherIconUrl } from "@/services/weather/openWeather";
// import { useLocale } from "@/i18n/i18nStore";
//
// export function WeatherWidget() {
// 	const geo = useGeolocation();
// 	const { fullLocale, locale } = useLocale();
//
// 	const swrKey =
// 		geo.status === "success" ? ["openweather-current", geo.coords.lat, geo.coords.lon, locale] : null;
//
// 	const { data, error, isLoading } = useSWR(
// 		swrKey,
// 		([, lat, lon, loc]) => fetchCurrentWeather({ lat, lon, lang: loc, units: "metric" }),
// 		{
// 			revalidateOnFocus: false,
// 			shouldRetryOnError: false
// 		}
// 	);
//
// 	if (geo.status === "loading" || isLoading) {
// 		return <div className={css.root}>Loading weather…</div>;
// 	}
//
// 	if (geo.status === "error") {
// 		return <div className={css.root}>Location error: {geo.error}</div>;
// 	}
//
// 	if (error) {
// 		return <div className={css.root}>Weather error: {error.message}</div>;
// 	}
//
// 	const w = data?.weather?.[0];
// 	const icon = w?.icon;
//
// 	return (
// 		data && (
// 			<div className={css.weatherWidget}>
// 				<div className={css.top}>
// 					<div className={css.city}>
// 						{data.name}, {data.sys.country}
// 					</div>
//
// 					{icon ? (
// 						<img
// 							className={css.icon}
// 							src={openWeatherIconUrl(icon)}
// 							alt={w?.description || "weather"}
// 						/>
// 					) : null}
// 				</div>
//
// 				<div className={css.tempRow}>
// 					<div className={css.temp}>{Math.round(data.main.temp)}°</div>
// 					<div className={css.desc}>
// 						<div className={css.main}>{w?.main}</div>
// 						<div className={css.sub}>{w?.description}</div>
// 						<div className={css.sub}>Feels like: {Math.round(data.main.feels_like)}°</div>
// 					</div>
// 				</div>
//
// 				<div className={css.grid}>
// 					<div className={css.item}>
// 						<div className={css.label}>Humidity</div>
// 						<div className={css.value}>{data.main.humidity}%</div>
// 					</div>
// 					<div className={css.item}>
// 						<div className={css.label}>Wind</div>
// 						<div className={css.value}>{data.wind.speed} m/s</div>
// 					</div>
// 					<div className={css.item}>
// 						<div className={css.label}>Sunrise</div>
// 						<div className={css.value}>{formatUnixTime(data.sys.sunrise, fullLocale)}</div>
// 					</div>
// 					<div className={css.item}>
// 						<div className={css.label}>Sunset</div>
// 						<div className={css.value}>{formatUnixTime(data.sys.sunset, fullLocale)}</div>
// 					</div>
// 				</div>
// 			</div>
// 		)
// 	);
// }
