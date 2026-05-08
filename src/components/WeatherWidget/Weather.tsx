import css from "@css/component/weather.module.scss";
import { useTranslation } from "@/i18n/useTranslation";
import { useState } from "react";

export function Weather() {
	const t = useTranslation();
	const [city, setCity] = useState("");

	return (
		<div className={css.weatherWidget}>
			<div className={css.top}>
				<div className={css.city}>{city}</div>
			</div>
			<div className={css.inputContainer}>
				<span className={css.placeholder}>{t("weather.enterCity")}</span>
				<input
					id="city"
					type="text"
					className={css.input}
					value={city}
					onChange={(e) => setCity(e.target.value)}
				/>
			</div>
		</div>
	);
}
