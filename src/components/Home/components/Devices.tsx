import css from "@/assets/styles/pages/Home/devices.module.scss";
import Image from "next/image";

export function Laptop({ children }: { children: React.ReactNode }) {
	return (
		<div className={css.laptop}>
			<div className={css.screenWrapper}>
				<div className={css.border} />
				<div className={css.screen}>{children}</div>
			</div>
			<div className={css.bottomPanel} />
		</div>
	);
}

export function Tablet() {
	return (
		<div className={css.tablet}>
			<div className={css.border} />
			<div className={css.button} />
			<div className={css.soundUp} />
			<div className={css.soundDown} />
			<div className={css.screenWrapper}>
				<div className={css.screen}>
					<Image
						src={"/images/site/tablet.webp"}
						alt={"screen"}
						width={360}
						height={675}
						sizes="(max-width: 768px) 50vw, 360px"
						className={css.image}
					/>
				</div>
			</div>
		</div>
	);
}

export function Mobile() {
	return (
		<div className={css.mobile}>
			<div className={css.border} />
			<div className={css.button} />
			<div className={css.soundUp} />
			<div className={css.soundDown} />
			<div className={css.screenWrapper}>
				<div className={css.screen}>
					<Image
						src={"/images/site/mobile.webp"}
						alt={"screen"}
						width={230}
						height={888}
						sizes="(max-width: 768px) 40vw, 230px"
						className={css.image}
					/>
				</div>
			</div>
		</div>
	);
}
