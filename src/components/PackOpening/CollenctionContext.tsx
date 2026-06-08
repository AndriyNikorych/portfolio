import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { BoosterType } from "@/components/PackOpening/utils";

export interface CollectedAvatar {
	id: string;
	src: string;
	rarity: BoosterType;
}

interface CollectionContextType {
	collection: CollectedAvatar[];
	addAvatar: (avatar: Omit<CollectedAvatar, "id">) => void;
	removeAndReplace: (indices: string[], newAvatar: Omit<CollectedAvatar, "id">) => void;
	balance: number;
	setBalance: (balance: number) => void;
}

const CollectionContext = createContext<CollectionContextType | null>(null);

let _id = 0;
const uid = () => `av-${++_id}`;

export function CollectionProvider({ children }: { children: ReactNode }) {
	const [collection, setCollection] = useState<CollectedAvatar[]>([]);
	const [balance, setBalance] = useState(2000);

	const addAvatar = useCallback((avatar: Omit<CollectedAvatar, "id">) => {
		setCollection((prev) => [...prev, { ...avatar, id: uid() }]);
	}, []);

	const removeAndReplace = useCallback((ids: string[], newAvatar: Omit<CollectedAvatar, "id">) => {
		setCollection((prev) => {
			const filtered = prev.filter((a) => !ids.includes(a.id));
			return [...filtered, { ...newAvatar, id: uid() }];
		});
	}, []);

	return (
		<CollectionContext.Provider value={{ collection, addAvatar, balance, setBalance, removeAndReplace }}>
			{children}
		</CollectionContext.Provider>
	);
}

export function useCollection() {
	const ctx = useContext(CollectionContext);
	if (!ctx) throw new Error("useCollection must be used within CollectionProvider");
	return ctx;
}
