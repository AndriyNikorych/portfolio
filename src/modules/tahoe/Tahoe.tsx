"use client";
import { useMediaQuery } from "@mui/material";
import { Iphone } from "@/components/Iphone/Iphone";
import { MacBook } from "@/components/Macbook/MacBook";
import css from "@/assets/styles/pages/tahoe.module.scss";

export function Tahoe() {
	const isMobile = useMediaQuery(
		"((max-width: 660px) and (orientation: portrait)) or ((max-height: 660px) and (orientation: landscape))"
	);

	return <div className={css.tahoe}>{isMobile ? <Iphone /> : <MacBook />}</div>;
}
