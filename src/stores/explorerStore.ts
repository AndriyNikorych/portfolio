import { useSyncExternalStore } from "react";

let openIds = new Set<string>();
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export const openExplorer = (id: string) => {
	openIds = new Set([...openIds, id]);
	emit();
};
export const closeExplorer = (id: string) => {
	openIds = new Set([...openIds].filter((x) => x !== id));
	emit();
};
export const useExplorerOpen = (id: string) =>
	useSyncExternalStore(
		(cb) => {
			listeners.add(cb);
			return () => listeners.delete(cb);
		},
		() => openIds.has(id),
		() => false
	);
