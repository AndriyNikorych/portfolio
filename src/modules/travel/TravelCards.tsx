import css from "@/assets/styles/pages/travel.module.scss";
import Image from "next/image";

const cardsData = {
	dinner: {
		title: "Romantic dinner",
		description:
			"Enjoy a private, exquisite candlelit dinner on the pristine white sands and sound of the ocean waves",
		image: "/images/travel/romantic.webp"
	},
	spa: {
		title: "SPA",
		description:
			"Experience ultimate relaxation with soothing holistic treatments inspired by the calm rhythm of the sea.",
		image: "/images/travel/spa.webp"
	},
	diving: {
		title: "Diving",
		description:
			"Swim alongside majestic manta rays and colorful marine life in a world-class underwater adventure.",
		image: "/images/travel/diving.webp"
	}
};
export function TravelCards({ ref }: { ref: React.RefObject<HTMLDivElement | null> }) {
	const cards = Object.values(cardsData);

	return (
		<div className={css.cards} ref={ref}>
			{cards.map((card) => (
				<div key={card.title} className={css.card}>
					<div className={css.imageWrapper}>
						<Image
							src={card.image}
							alt={card.title}
							width={300}
							height={300}
							objectFit={"contain"}
							className={css.cardImage}
						/>
					</div>
					<div className={css.cardInfo}>
						<div className={css.cardTitle}>{card.title}</div>
						<div className={css.cardDescription}>{card.description}</div>
					</div>
				</div>
			))}
		</div>
	);
}
