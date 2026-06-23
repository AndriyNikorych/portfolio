import { useState, useEffect, useRef } from "react";

const FRAME_COUNT = 75;

const urls: string[] = [
	// CSS background (critical — above the fold)
	"/images/travel/maldive.webp",

	// Facts
	...Array.from({ length: 9 }, (_, i) => `/images/travel/facts/${i + 1}.webp`),

	// PhotoCards
	...Array.from({ length: 5 }, (_, i) => `/images/travel/maldives${i + 1}.webp`),

	// Video frames
	...Array.from(
		{ length: FRAME_COUNT },
		(_, i) => `/images/travel/frames/frame_${String(i + 1).padStart(4, "0")}.webp`
	)
];

export function useImagePreloader() {
	const [loaded, setLoaded] = useState(0);
	const total = urls.length;
	const isReady = loaded >= total;
	const progress = total > 0 ? Math.round((loaded / total) * 100) : 100;
	const urlsRef = useRef(urls);

	useEffect(() => {
		let cancelled = false;
		setLoaded(0);

		if (urlsRef.current.length === 0) return;

		const images: HTMLImageElement[] = [];

		urlsRef.current.forEach((url) => {
			const img = new Image();
			img.onload = img.onerror = () => {
				if (!cancelled) setLoaded((prev) => prev + 1);
			};
			img.src = url;
			images.push(img);
		});

		return () => {
			cancelled = true;
			images.forEach((img) => {
				img.onload = img.onerror = null;
				img.src = "";
			});
		};
	}, []);

	return { progress, isReady, loaded, total };
}
