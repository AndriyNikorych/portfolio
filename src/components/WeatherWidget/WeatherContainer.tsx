import WeatherIcon from "@/assets/svg/ios-weather.svg";
import { useState } from "react";
import css from "@css/component/weather.module.scss";
import { useTranslation } from "@/i18n/i18nProvider";
import { Explorer } from "@/components/Explorer/Explorer";
import { Weather } from "@/components/WeatherWidget/Weather";
import { IconButton } from "@/components/IconButton/IconButton";

export function WeatherContainer() {
	const [open, setOpen] = useState(false);
	const t = useTranslation();

	return (
		<div className={css.root}>
			<IconButton
				icon={<WeatherIcon />}
				onClick={() => setOpen((prev) => !prev)}
				label={t("app.weather")}
			/>
			{open && (
				<Explorer id={"weather"} onClose={() => setOpen(false)}>
					<Weather />
				</Explorer>
			)}
		</div>
	);
}
