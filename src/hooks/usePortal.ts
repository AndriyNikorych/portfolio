import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function usePortal(component: ReactNode, id = "explorer-portal") {
	const [element, setElement] = useState<HTMLDivElement | null>(null);

	useEffect(() => {
		const element = document.createElement("div");
		const container = document.querySelector("#" + id);
		setElement(element);
		if (container) {
			container.appendChild(element);
		}
		return () => {
			element.remove();
		};
	}, []);

	if (!component || !element) {
		return null;
	}

	return createPortal(component, element);
}
