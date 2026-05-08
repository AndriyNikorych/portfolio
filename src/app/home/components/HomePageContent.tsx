import css from "@css/pages/home.module.scss";
import { useTranslation } from "@/i18n/useTranslation";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

export function HomePageContent() {
	const t = useTranslation();
	const helloRef = useRef<HTMLDivElement>(null);
	const descriptionRef = useRef<HTMLDivElement>(null);
	const nameRef = useRef<HTMLHeadingElement>(null);
	const surnameRef = useRef<HTMLDivElement>(null);

	const hello = t("home.hello");
	const description = t("home.description");

	useEffect(() => {
		const timeline = gsap.timeline();

		timeline
			.to(helloRef.current, {
				duration: 1,
				text: { value: hello },
				ease: `steps(${hello.length})`
			})
			.to(nameRef.current, { x: 0, opacity: 1, delay: 0.2, duration: 1, ease: "power1.out" })
			.to(surnameRef.current, { x: 0, opacity: 1, duration: 1, ease: "power1.out" })
			.to(descriptionRef.current, {
				duration: 2,
				text: { value: description, delimiter: "" },
				ease: `steps(${description.length})`
			});
	}, [hello, description]);

	return (
		<div className={css.content}>
			<div className={css.hello} ref={helloRef} />
			<div className={css.title}>
				<h1 className={css.name} ref={nameRef}>
					{t("home.name")}
				</h1>
				<h1 className={css.surname} ref={surnameRef}>
					{t("home.surname")}
				</h1>
			</div>

			<div className={css.description} ref={descriptionRef} />
		</div>
	);
}
