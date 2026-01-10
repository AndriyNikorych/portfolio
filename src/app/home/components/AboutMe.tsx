import css from "@css/pages/home.module.scss";

function fullYearsSinceOct12_2021(now = new Date()) {
	const start = new Date(2021, 9, 12); // 9 = October (0-based)
	let years = now.getFullYear() - start.getFullYear();

	const hasHadAnniversaryThisYear =
		now.getMonth() > start.getMonth() ||
		(now.getMonth() === start.getMonth() && now.getDate() >= start.getDate());

	if (!hasHadAnniversaryThisYear) years -= 1;

	return years;
}

export function AboutMe() {
	const years = fullYearsSinceOct12_2021();

	return (
		<div className={css.description}>
			<p>
				{`Front-End Developer with ${years} years of experience in e-commerce, delivering
						production-ready React applications. I care deeply about UI/UX polish and performance:
						from reusable component systems and theming to animation-rich interfaces
						(micro-interactions, transitions, scroll effects). I like collaborating with designers
						and turning bold ideas into clean, maintainable`}
				<span className={css.code}>{` <code>`}</span>
			</p>
		</div>
	);
}
