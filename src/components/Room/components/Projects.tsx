import cn from "classnames";
import css from "@css/pages/oldHome.module.scss";

const text = [
	"Online Platform with Mini Games: Developed a dynamic platform featuring interactive mini-games",
	"Company Portfolio Page: Designed and implemented a comprehensive portfolio page for my company",
	"Wine E-Shop: Built an e-commerce platform for a wine shop, enhancing user experience and functionality"
];

export function Projects() {
	return (
		<div className={cn(css.container, css.projects)}>
			<div className={css.terminalHeader}>
				<span className={css.terminalPrompt}>nikorych@portfolio</span>
				<span className={css.terminalPath}>:~/projects</span>
				<span className={css.terminalDollar}>$</span>
				<span className={css.terminalCmd}> ls</span>
			</div>
			{text.map((item, index) => (
				<div key={index} className={css.terminalItem}>
					{item}
				</div>
			))}
		</div>
	);
}
