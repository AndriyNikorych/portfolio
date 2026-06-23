import { AVATAR_LIST } from "@/components/PackOpening/utils";
import css from "@/assets/styles/component/packOpening.module.scss";
import Image from "next/image";

export function AvatarList({ setSelectedAvatar }: { setSelectedAvatar: (url: string) => void }) {
	return (
		<div className={css.avatarsList}>
			{AVATAR_LIST.map((r) => {
				return r.url.map((el) => {
					return (
						<Image
							src={el}
							alt={r.rarity}
							width={100}
							height={100}
							className={css.avatarsItems}
							key={el}
							onClick={() => setSelectedAvatar(el)}
						/>
					);
				});
			})}
		</div>
	);
}
