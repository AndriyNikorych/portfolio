import { RefObject, useCallback, useRef } from "react";
import { AVATARS_BY_RARITY, BoosterType, getNextRarity, rarityColor } from "@/components/PackOpening/utils";
import gsap from "gsap";

type Props = {
	itemsRef: RefObject<HTMLDivElement | null>;
	selectedRarity: BoosterType | null;
	updateIdList: string[];
	onComplete: (newSrc: string, nextRarity: BoosterType) => void;
};

export function useMergeAnimation({ itemsRef, onComplete, selectedRarity, updateIdList }: Props) {
	const animatingRef = useRef(false);

	return useCallback(() => {
		if (!itemsRef.current || !selectedRarity || animatingRef.current) return;

		animatingRef.current = true;

		// --- Gather selected DOM elements by data-index ---
		const selectedEls: HTMLElement[] = updateIdList
			.map((id) => itemsRef.current!.querySelector<HTMLElement>(`[data-id="${id}"]`))
			.filter(Boolean) as HTMLElement[];

		if (selectedEls.length !== 10) return;

		const centerX = window.innerWidth / 2;
		const centerY = window.innerHeight / 2;

		// --- Create fixed overlay for animation ---
		const overlay = document.createElement("div");
		overlay.style.cssText = "position:fixed;inset:0;z-index:9999;pointer-events:none;overflow:hidden;";
		document.body.appendChild(overlay);

		let rectEl = selectedEls[0].getBoundingClientRect();

		// --- Clone each selected element and fix-position it ---
		const clones: HTMLElement[] = selectedEls.map((el) => {
			const rect = el.getBoundingClientRect();
			const clone = el.cloneNode(true) as HTMLElement;
			clone.style.cssText = `
				position:fixed;
				left:${rect.left}px;
				top:${rect.top}px;
				width:${rect.width}px;
				height:${rect.height}px;
				border-radius:8px;
				overflow:hidden;
				margin:0;
				pointer-events:none;
			`;
			overlay.appendChild(clone);
			return clone;
		});

		// --- Determine the new card ---
		const nextRarity = getNextRarity(selectedRarity);
		const pool = AVATARS_BY_RARITY[nextRarity];
		const newSrc = pool[Math.floor(Math.random() * pool.length)];

		// --- Create the "merge glow" element ---
		const glow = document.createElement("div");
		glow.style.cssText = `
            position:fixed;
            left:${centerX}px;
            top:${centerY}px;
            width:0;height:0;
            border-radius:50%;
            background:radial-gradient(circle, ${rarityColor[selectedRarity]}, transparent 70%);
            transform:translate(-50%,-50%);
            opacity:0;
            pointer-events:none;
        `;
		overlay.appendChild(glow);

		// --- Create the result card (hidden initially) ---
		const card = document.createElement("div");
		card.style.cssText = `
			position:fixed;
			left:${centerX}px;
			top:${centerY}px;
			width:${rectEl.width}px;
			height:${rectEl.height}px;
			transform:translate(-50%,-50%) scale(0);
			border-radius:12px;
			overflow:hidden;
			border:2px solid ${rarityColor[nextRarity]};
			box-shadow:0 0 30px ${rarityColor[nextRarity]};
			pointer-events:none;
		`;
		const img = document.createElement("img");
		img.src = newSrc;
		img.style.cssText = "width:100%;height:100%;object-fit:cover;";
		card.appendChild(img);
		overlay.appendChild(card);

		// --- Hide originals while animating ---
		selectedEls.forEach((el) => (el.style.opacity = "0"));

		// --- GSAP Timeline ---
		const tl = gsap.timeline({
			onComplete: () => {
				// Clean up
				gsap.to(card, {
					opacity: 0,
					scale: 1.3,
					duration: 0.5,
					delay: 0.8,
					onComplete: () => {
						onComplete(newSrc, nextRarity);
						animatingRef.current = false;
						overlay.remove();
						selectedEls.forEach((el) => (el.style.opacity = ""));
					}
				});
			}
		});

		const topClone = clones[clones.length - 1];
		const otherClones = clones.slice(0, -1);

		// Phase 1: Fly clones to center (staggered)
		tl.to(clones, {
			left: centerX - rectEl.width / 2,
			top: centerY - rectEl.height / 2,
			duration: 0.7,
			ease: "power3.in",
			stagger: 0.04
		});

		// Phase 2a: All clones except top shrink & fade out
		tl.to(otherClones, {
			width: 0,
			height: 0,
			left: centerX,
			top: centerY,
			opacity: 0,
			duration: 0.3,
			ease: "power2.in"
		});

		// Phase 2b: Top clone grows slightly and turns white
		tl.to(
			topClone,
			{
				scale: 3,
				filter: "brightness(4) sepia(0)",
				duration: 3,
				ease: "power4.out"
			},
			"-=0.15"
		);

		tl.to(
			topClone,
			{
				scale: 0,
				duration: 0.3,
				ease: "power4.out"
			},
			"-=0.15"
		);

		tl.fromTo(
			glow,
			{ width: 0, height: 0, opacity: 0.8 },
			{
				width: Math.max(window.innerWidth, window.innerHeight),
				height: Math.max(window.innerWidth, window.innerHeight),
				opacity: 0,
				duration: 0.5,
				ease: "power2.out"
			},
			"-=0.3"
		);

		// Phase 3: Top clone "explodes" — scales up fast & fades
		tl.to(topClone, {
			scale: 3,
			opacity: 0,
			duration: 0.3,
			ease: "power2.out"
		});

		// Phase 4: New card appears from the explosion
		tl.fromTo(
			card,
			{ scale: 0, rotation: -15 },
			{
				scale: 1,
				rotation: 0,
				duration: 0.5,
				ease: "back.out(2)"
			},
			"-=0.3"
		);
	}, [updateIdList, selectedRarity]);
}
