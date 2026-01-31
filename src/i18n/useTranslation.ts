import { useCallback, useSyncExternalStore } from "react";
import { getSnapshot, subscribe, t as storeT } from "./i18nStore";

export function useTranslation() {
	useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

	return useCallback((key: string) => storeT(key), []);
}
