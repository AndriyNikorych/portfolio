"use client";

import { useEffect } from "react";
import { initI18n } from "./i18nStore";

export function I18nInit() {
	useEffect(() => {
		initI18n();
	}, []);

	return null;
}
