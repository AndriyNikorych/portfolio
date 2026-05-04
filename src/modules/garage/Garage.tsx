"use client";

import css from "@css/pages/garage.module.scss";
import { GarageTitle } from "@/modules/garage/GarageTitle";
import { CarItem } from "@/modules/garage/CarItem";
import { carsData } from "@/modules/garage/carsData";

export function GarageOfDream() {
	return (
		<section className={css.root}>
			<GarageTitle />
			{carsData.map((car, index) => (
				<CarItem key={index} {...car} />
			))}
		</section>
	);
}
