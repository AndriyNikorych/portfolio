import css from "@css/pages/garage.module.scss";

export function GarageTitle() {
	return (
		<div className={css.titlePage}>
			<div className={css.net} />

			<div className={css.titleWrapper}>
				<h1 className={css.title}>
					<div>DREAM</div>
					<div>GARAGE</div>
				</h1>

				<div className={css.subTitle}>V.01 Technical specification</div>

				<div className={css.description}>
					<span className={css.desc}>
						Completed: <span className={css.value}>85%</span>
					</span>

					<span className={css.desc}>
						Last update: <span className={css.value}>28.04.2026</span>
					</span>
				</div>
			</div>
			<span className={css.scrollText}>Scroll down</span>
		</div>
	);
}
