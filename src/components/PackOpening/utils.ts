import { CollectedAvatar } from "@/components/PackOpening/CollenctionContext";

export enum BoosterType {
	common = "common",
	uncommon = "uncommon",
	rare = "rare",
	legendary = "legendary"
}

export const rarityColor = {
	[BoosterType.common]: "#00ff0a",
	[BoosterType.uncommon]: "#4cc7ff",
	[BoosterType.rare]: "#e651ff",
	[BoosterType.legendary]: "#ffd700"
};

export const packObject = {
	[BoosterType.common]: {
		cost: 50,
		chances: {
			common: 84,
			uncommon: 10,
			rare: 5,
			legendary: 1
		},
		color: "rgb(63 129 63 / 0.7)"
	},
	[BoosterType.uncommon]: {
		cost: 200,
		chances: {
			common: 80,
			uncommon: 20,
			rare: 8,
			legendary: 2
		},
		color: "rgb(0 79 133 / 0.7)"
	},
	[BoosterType.rare]: {
		cost: 500,
		chances: {
			common: 65,
			uncommon: 20,
			rare: 10,
			legendary: 5
		},
		color: "rgb(83 60 126 / 0.7)"
	},
	[BoosterType.legendary]: {
		cost: 1000,
		chances: {
			common: 40,
			uncommon: 30,
			rare: 20,
			legendary: 10
		},
		color: "rgb(255 215 0 / 0.7)"
	}
};

export function getNextRarity(rarity: BoosterType): BoosterType {
	const order = [BoosterType.common, BoosterType.uncommon, BoosterType.rare, BoosterType.legendary];
	const idx = order.indexOf(rarity);
	return order[Math.min(idx + 1, order.length - 1)];
}

export const AVATARS_BY_RARITY: Record<BoosterType, string[]> = {
	[BoosterType.common]: [
		"/images/packOpening/avatars/common/1.webp",
		"/images/packOpening/avatars/common/2.webp",
		"/images/packOpening/avatars/common/3.webp",
		"/images/packOpening/avatars/common/4.webp"
	],
	[BoosterType.uncommon]: [
		"/images/packOpening/avatars/uncommon/1.webp",
		"/images/packOpening/avatars/uncommon/2.webp",
		"/images/packOpening/avatars/uncommon/3.webp",
		"/images/packOpening/avatars/uncommon/4.webp",
		"/images/packOpening/avatars/uncommon/5.webp"
	],
	[BoosterType.rare]: [
		"/images/packOpening/avatars/rare/1.webp",
		"/images/packOpening/avatars/rare/2.webp",
		"/images/packOpening/avatars/rare/3.webp",
		"/images/packOpening/avatars/rare/4.webp"
	],
	[BoosterType.legendary]: [
		"/images/packOpening/avatars/legendary/1.webp",
		"/images/packOpening/avatars/legendary/2.webp",
		"/images/packOpening/avatars/legendary/3.webp",
		"/images/packOpening/avatars/legendary/4.webp",
		"/images/packOpening/avatars/legendary/5.webp"
	]
};

export const AVATAR_LIST = [
	{ rarity: BoosterType.common, url: AVATARS_BY_RARITY.common },
	{ rarity: BoosterType.rare, url: AVATARS_BY_RARITY.rare },
	{ rarity: BoosterType.legendary, url: AVATARS_BY_RARITY.legendary }
];

export function generateWeightedAvatars(type: BoosterType, count: number) {
	const chances = packObject[type].chances;
	const result: Omit<CollectedAvatar, "id">[] = [];

	for (let i = 0; i < count; i++) {
		const roll = Math.random() * 100;
		let c = 0;

		for (const [rarity, chance] of Object.entries(chances)) {
			c += chance;
			if (roll < c) {
				const pool = AVATARS_BY_RARITY[rarity as BoosterType];
				const r = rarity as BoosterType;
				result.push({ rarity: r, src: pool[Math.floor(Math.random() * pool.length)] });
				break;
			}
		}
	}

	return result;
}
