import css from "@/assets/styles/component/packOpening.module.scss";
import Image from "next/image";
import { rarityColor } from "@/components/PackOpening/utils";
import { CollectedAvatar } from "@/components/PackOpening/CollenctionContext";

type Props = {
	avatar: CollectedAvatar;
	index: number;
	classNames: string;
	onSelect: () => void;
};

export function CollectionItem({ avatar, index, classNames, onSelect }: Props) {
	return (
		<div
			data-id={avatar.id}
			className={classNames}
			style={{ ["--color" as string]: rarityColor[avatar.rarity] }}
			onClick={onSelect}
		>
			<Image
				src={avatar.src}
				alt={`avatar-${index}`}
				width={150}
				height={150}
				className={css.collectionImage}
			/>
		</div>
	);
}
