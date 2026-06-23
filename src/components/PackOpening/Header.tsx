import css from "@/assets/styles/component/packOpening.module.scss";
import Image from "next/image";
import { useCollection } from "@/components/PackOpening/CollenctionContext";
import { useState } from "react";
import { Collection } from "@/components/PackOpening/Collection/Collection";

export function Header() {
	const { balance } = useCollection();
	const [openCollection, setOpenCollection] = useState(false);

	return (
		<div className={css.header}>
			<div>
				<h1 className={css.title}>Pack Opening</h1>
				<h4 className={css.subTitle}>Try your luck — every pack guarantees a new card.</h4>
			</div>

			<div className={css.rightSide}>
				<div className={css.myCollection} onClick={() => setOpenCollection(!openCollection)}>
					Collection
				</div>

				<div className={css.balance}>
					<Image src={"/images/packOpening/coin.png"} alt={"coin"} width={20} height={20} />
					{balance}
				</div>
			</div>

			{openCollection && <Collection setOpenCollection={setOpenCollection} />}
		</div>
	);
}
