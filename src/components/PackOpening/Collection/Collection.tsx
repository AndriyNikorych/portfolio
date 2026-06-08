import { useCollection } from "@/components/PackOpening/CollenctionContext";
import css from "@css/component/packOpening.module.scss";
import Cross from "@/assets/svg/cross.svg";
import { useCallback, useRef, useState } from "react";
import cn from "classnames";
import { BoosterType } from "@/components/PackOpening/utils";
import { useMergeAnimation } from "@/components/PackOpening/Collection/useMergeAnimation";
import { CollectionItem } from "@/components/PackOpening/Collection/CollectionItem";

export function Collection({ setOpenCollection }: { setOpenCollection: (open: boolean) => void }) {
	const { collection, removeAndReplace } = useCollection();
	const [selectedRarity, setSelectedRarity] = useState<BoosterType | null>(null);
	const [updateIdList, setUpdateIdList] = useState<string[]>([]);
	const [updateMod, setUpdateMod] = useState(false);
	const itemsRef = useRef<HTMLDivElement>(null);

	const selectAvatar = useCallback(
		(id: string, rarity: BoosterType) => {
			if (!updateMod) return;
			if (!selectedRarity) {
				setSelectedRarity(rarity);
			} else if (rarity !== selectedRarity) return;
			setUpdateIdList((prev) => {
				const isInList = prev.includes(id);
				if (isInList) {
					return prev.filter((e) => e !== id);
				} else if (prev.length === 10) {
					return prev;
				}
				return [...prev, id];
			});
		},
		[updateMod, selectedRarity]
	);

	const onUpdateClick = useCallback(() => {
		if (updateMod) {
			setSelectedRarity(null);
			setUpdateIdList([]);
		}
		setUpdateMod(!updateMod);
	}, [updateMod]);

	const triggerMerge = useMergeAnimation({
		itemsRef,
		selectedRarity,
		updateIdList,
		onComplete: (newSrc, nextRarity) => {
			removeAndReplace(updateIdList, { src: newSrc, rarity: nextRarity });
			setUpdateIdList([]);
			setSelectedRarity(null);
			setUpdateMod(false);
		}
	});

	return (
		<div className={css.collection}>
			<button className={css.close} onClick={() => setOpenCollection(false)}>
				<Cross />
			</button>
			<h2 className={css.collectionTitle}>{"My collection (" + collection.length + ")"} </h2>

			<div className={css.updateBar}>
				<div className={css.buttonsBlock}>
					<button className={css.update} onClick={onUpdateClick}>
						{!updateMod ? "Update" : "Cancel Update"}
					</button>
					{updateIdList.length === 10 && (
						<button className={css.confirm} onClick={triggerMerge}>
							Confirm
						</button>
					)}
				</div>

				{updateMod && <div className={css.amount}>{updateIdList.length + "/10"}</div>}
			</div>

			{!collection.length && <p>No collection</p>}

			<div className={css.collectionItems} ref={itemsRef}>
				{collection.map((avatar, index) => {
					const isFiltered = selectedRarity && selectedRarity !== avatar.rarity;

					return (
						<CollectionItem
							avatar={avatar}
							index={index}
							key={avatar.id}
							classNames={cn(
								css.collectionItem,
								css[avatar.rarity],
								isFiltered && css.filtered,
								updateMod && css.updateMod,
								updateIdList.includes(avatar.id) && css.selected
							)}
							onSelect={() => selectAvatar(avatar.id, avatar.rarity)}
						/>
					);
				})}
			</div>
		</div>
	);
}
