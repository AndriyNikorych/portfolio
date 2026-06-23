"use client";
import { createContext, useContext, ReactNode, useCallback } from "react";
import { Locale } from "./config";

const FULL_LOCALE: Record<Locale, string> = {
	en: "en-EN",
	uk: "uk-UA"
};

type I18nContextType = { locale: Locale; messages: Record<string, any> };
const I18nContext = createContext<I18nContextType>(null!);

export function I18nProvider({ locale, messages, children }: I18nContextType & { children: ReactNode }) {
	return <I18nContext.Provider value={{ locale, messages }}>{children}</I18nContext.Provider>;
}

export function useLocale() {
	const { locale } = useContext(I18nContext);
	return {
		locale,
		fullLocale: FULL_LOCALE[locale]
	};
}

export function useTranslation() {
	const { messages } = useContext(I18nContext);
	return useCallback(
		(key: string) => {
			const parts = key.split(".");
			let val: any = messages;
			for (const p of parts) val = val?.[p];
			return typeof val === "string" ? val : key;
		},
		[messages]
	);
}
