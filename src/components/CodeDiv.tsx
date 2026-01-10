import css from "@css/pages/home.module.scss";

type CodeDivType = {
	el: string;
	color: string;
	padding?: number;
	children: React.ReactNode | string;
};

export function CodeDiv({ el, padding = 40, color, children }: CodeDivType) {
	return (
		<div className={css.codeEl} style={{ paddingLeft: padding + "px" }}>
			{`<${el}>`} <div className={css[color]}>{children}</div>
			{`</${el}>`}
		</div>
	);
}
