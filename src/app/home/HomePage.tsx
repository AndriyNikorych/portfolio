import css from "@css/pages/home.module.scss";
import { Header } from "@/components/Header";
import { AboutMe } from "@/app/home/components/AboutMe";
import { TechStack } from "@/app/home/components/TechStack";
import cn from "classnames";
import { ContactList } from "@/app/home/components/ContactList";
import { Projects } from "@/app/home/components/Projects";

export function HomePage() {
	return (
		<div className={css.root}>
			<div className={css.homePage}>
				<Header />
				<ContactList />
				<div className={css.content}>
					<div className={cn(css.container, css.about)}>
						<div className={css.aboutContent}>
							<div className={css.text}>
								<h3 className={css.position}>frontend developer</h3>
								<h1 className={css.name}>andriy nikorych</h1>
							</div>

							<img src="/images/photo.webp" alt="photo" className={css.photo} />
						</div>
						<AboutMe />
					</div>

					<TechStack />

					<Projects />
				</div>
			</div>
		</div>
	);
}
