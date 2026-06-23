import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import css from "@css/pages/Home/heroSection.module.scss";

gsap.registerPlugin(TextPlugin, ScrollTrigger);

interface HeroRefs {
	section: RefObject<HTMLElement | null>;
	title: RefObject<HTMLHeadingElement | null>;
	name: RefObject<HTMLSpanElement | null>;
	underline: RefObject<HTMLDivElement | null>;
	position: RefObject<HTMLHeadingElement | null>;
}

export function useHeroAnimations(refs: HeroRefs) {
	const { section, title, name, underline, position } = refs;

	useEffect(() => {
		if (!section.current || !title.current || !name.current) return;

		const titleText = title.current.textContent || "";
		const nameText = name.current.textContent || "";
		title.current.textContent = "";
		name.current.textContent = "";

		const ctx = gsap.context(() => {
			const tl = gsap.timeline();

			// 1. Title types in
			tl.to(title.current, {
				text: titleText,
				duration: titleText.length * 0.05,
				ease: "none"
			});

			// 2. Name types in
			tl.to(name.current, {
				text: nameText,
				duration: nameText.length * 0.05,
				ease: "none"
			});

			// 3. Underline scales in
			tl.to(underline.current, {
				x: 0,
				duration: 0.4,
				ease: "power2.out"
			});

			// 4. Position fades in
			tl.to(position.current, {
				y: 0,
				opacity: 1,
				duration: 0.4,
				delay: 0.2,
				ease: "power2.out"
			});

			// 5. Services appear one by one
			tl.to(`.${css.service}`, {
				x: 0,
				opacity: 1,
				duration: 0.4,
				stagger: 0.15,
				ease: "power3.inOut",
				scrollTrigger: {
					trigger: section.current,
					start: "top 80%"
				}
			});

			// 6. Scroll button
			tl.to(`.${css.scroll}`, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "+=0.3");

			// 7. Avatar
			const avatarTl = gsap.timeline({
				scrollTrigger: {
					trigger: `.${css.avatar}`,
					start: "top 85%"
				}
			});

			avatarTl.to(`.${css.avatar}`, {
				scale: 1,
				opacity: 1,
				duration: 1,
				ease: "power2.out"
			});

			avatarTl.to(
				`.${css.availability}`,
				{ y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
				"-=0.3"
			);
			avatarTl.to(
				`.${css.experience}`,
				{ y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
				"-=0.3"
			);
		}, section);

		return () => ctx.revert();
	}, [section, title, name, underline, position]);
}
