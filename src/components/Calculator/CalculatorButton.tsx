import CalculatorIcon from "@/assets/svg/calculator.svg";
import css from "@/assets/styles/component/calculator.module.scss";
import { useRef, useState } from "react";
import { Explorer } from "@/components/Explorer/Explorer";
import { Calculator } from "@/components/Calculator/Calculator";
import { useTranslation } from "@/i18n/useTranslation";
import { IconButton } from "@/components/IconButton/IconButton";

export function CalculatorButton() {
	const [open, setOpen] = useState(false);
	const iconRef = useRef<HTMLDivElement>(null);
	const t = useTranslation();

	return (
		<div className={css.desktopCalculator}>
			<IconButton icon={<CalculatorIcon />} onClick={() => setOpen(true)} label={t("app.calculator")} />
			{open && (
				<Explorer
					id={"desktopCalculator"}
					classes={{ root: css.explorer }}
					withFullWidth={false}
					iconRef={iconRef}
					maxContentWidth
					onClose={() => setOpen(false)}
				>
					<Calculator />
				</Explorer>
			)}
		</div>
	);
}
