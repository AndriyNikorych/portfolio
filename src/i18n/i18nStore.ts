import { useSyncExternalStore } from "react";

export enum LOCALE_ENUM {
	EN = "en",
	UK = "uk"
}

export const FULL_LOCALE = {
	[LOCALE_ENUM.EN]: "en-EN",
	[LOCALE_ENUM.UK]: "uk-UA"
};

export type Locale = LOCALE_ENUM.EN | LOCALE_ENUM.UK;

export type Messages = Record<string, unknown>;

export type I18nState = {
	locale: Locale;
	messages: Messages;
	loading: boolean;
	error?: string;
};

const STORAGE_KEY = "locale";

const listeners = new Set<() => void>();

let state: I18nState = {
	locale: LOCALE_ENUM.EN,
	messages: {},
	loading: true
};

const cache = new Map<Locale, Messages>();

function emit() {
	for (const l of listeners) l();
}

export function getSnapshot(): I18nState {
	return state;
}

export function subscribe(listener: () => void) {
	listeners.add(listener);
	return () => listeners.delete(listener);
}

function isLocale(x: unknown): x is Locale {
	return x === LOCALE_ENUM.EN || x === LOCALE_ENUM.UK;
}

export async function prefetchLocale(locale: Locale) {
	try {
		await loadMessages(locale);
	} catch {}
}

async function loadMessages(locale: Locale): Promise<Messages> {
	const cached = cache.get(locale);
	if (cached) return cached;

	const res = await fetch(`/locales/${locale}.json`, {
		cache: "force-cache"
	});

	if (!res.ok) {
		throw new Error(`Failed to load /locales/${locale}.json: ${res.status}`);
	}

	const json = (await res.json()) as Messages;
	cache.set(locale, json);
	return json;
}

function getByPath(obj: unknown, path: string): unknown {
	if (!obj) return undefined;
	if (!path) return obj;

	const parts = path.split(".");
	let cur: any = obj;

	for (const p of parts) {
		if (cur == null || typeof cur !== "object") return undefined;
		cur = cur[p];
	}

	return cur;
}

export function t(key: string): string {
	const value = getByPath(state.messages, key);

	if (typeof value === "string") return value;
	if (typeof value === "number") return value.toString();

	return key;
}

export async function setLocale(locale: Locale) {
	if (state.locale === locale && !state.loading) return;

	state = { ...state, locale, loading: true, error: undefined };
	emit();

	try {
		const messages = await loadMessages(locale);

		state = { ...state, messages, loading: false, error: undefined };
		document.documentElement.lang = locale;
		emit();

		if (typeof window !== "undefined") {
			window.localStorage.setItem(STORAGE_KEY, locale);
		}
	} catch (e) {
		console.log(e);
		state = {
			...state,
			loading: false,
			error: e instanceof Error ? e.message : String(e)
		};
		emit();
	}
}

export function initI18n() {
	if (typeof window === "undefined") return;

	const saved = window.localStorage.getItem(STORAGE_KEY);
	const locale: Locale = isLocale(saved) ? saved : LOCALE_ENUM.EN;
	document.documentElement.lang = locale;

	void setLocale(locale);
	void prefetchLocale(locale);
}

export function useLocale() {
	const snap = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

	return {
		locale: snap.locale,
		fullLocale: FULL_LOCALE[snap.locale],
		setLocale
	};
}
