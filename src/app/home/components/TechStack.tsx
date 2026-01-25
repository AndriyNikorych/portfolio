import css from "@css/pages/home.module.scss";
import cn from "classnames";
import { CodeDiv } from "@/components/CodeDiv";

const tech = ["React.js", "Next.js", "TypeScript", "HTML", "CSS", "JavaScript", "Git", "Figma", "Express.js"];

// export function TechStack() {
// 	return (
// 		<div className={cn(css.container, css.experience)}>
// 			<div className={css.code}>{`<header>`}</div>
// 			<CodeDiv el={"h1"} color={"pink"} children={"Technologies Stack"} />
// 			<div className={css.code}>{`<ul>`}</div>
// 			{tech.map((item, index) => (
// 				<CodeDiv key={index} el={"li"} color={"orange"} children={item} padding={80} />
// 			))}
// 			<div className={css.code}>{`</ul>`}</div>
// 			<div className={css.code}>{`</header>`}</div>
// 		</div>
// 	);
// }

export function TechStack() {
	const items = [...tech, ...tech];

	return (
		<section className={css.ticker}>
			<div className={css.tickerTrack}>
				{items.map((item, index) => (
					<div className={css.tickerItem} key={`${item}-${index}`}>
						{item}
					</div>
				))}
			</div>
		</section>
	);
}
