import css from "@/assets/styles/pages/travel.module.scss";
import Image from "next/image";

export function PhotoCard({ src, width, height }: { src: string; width: number; height: number }) {
	return (
		<div className={css.photoWrapper}>
			<Image src={src} width={width} height={height} className={css.photo} alt={src} />
		</div>
	);
}
