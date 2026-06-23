import css from "@css/pages/Home/home.module.scss";

type Props = {
	sectionName: string;
	title: string;
	subTitle: string;
};

export function TitleBlock({ sectionName, title, subTitle }: Props) {
	return (
		<div className={css.titleWrapper}>
			<span className={css.sectionName}>◆ {sectionName}</span>
			<h2 className={css.title}>{title}</h2>
			<h3 className={css.subTitle}>{subTitle}</h3>
		</div>
	);
}
