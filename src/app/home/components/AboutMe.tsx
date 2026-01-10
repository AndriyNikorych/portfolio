import css from "@css/pages/home.module.scss";
import { ContactList } from "@/app/home/components/ContactList";

export function AboutMe() {
	return (
		<div className={css.aboutMe}>
			<div className={css.aboutMeText}>
				<div className={css.topBlock}>
					<nav className={css.contacts}>
						<ContactList />
					</nav>
					<div className={css.nameWrapper}>
						<div className={css.name}>NIKORYCH ANDRIY</div>
						<div className={css.position}>Frontend developer</div>
					</div>
				</div>

				<div className={css.description}>
					Front-End Developer with 4 years of experience in e-commerce, delivering production-ready
					React applications. I care deeply about UI/UX polish and performance: from reusable
					component systems and theming to animation-rich interfaces (micro-interactions,
					transitions, scroll effects). I like collaborating with designers and turning bold ideas
					into clean, maintainable code. My technical skills include React, NodeJs, JavaScript,
					HTML, and CSS. I have contributed to several successful projects, including: - Online
					Platform with Mini Games: Developed a dynamic platform featuring interactive mini-games. -
					Company Portfolio Page: Designed and implemented a comprehensive portfolio page for my
					company. - Wine E-Shop: Built an e-commerce platform for a wine shop, enhancing user
					experience and functionality. I am passionate about creating seamless user experiences and
					bringing innovative web solutions to life.
				</div>
			</div>
		</div>
	);
}
