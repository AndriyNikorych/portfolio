import { useEffect, useMemo, useState } from "react";
import css from "@css/component/calculator.module.scss";
import { evaluate, formatNumber } from "@/components/Calculator/utils";
import cn from "classnames";
import { LiquidGlass } from "@/components/Liquid Glass";

type CalcError = { message: string };

const buttons = [
	{ value: "(", color: css.grey },
	{ value: ")", color: css.grey },
	{ value: "/", color: css.orange },
	{ value: "7", color: "" },
	{ value: "8", color: "" },
	{ value: "9", color: "" },
	{ value: "*", color: css.orange },
	{ value: "4", color: "" },
	{ value: "5", color: "" },
	{ value: "6", color: "" },
	{ value: "-", color: css.orange },
	{ value: "1", color: "" },
	{ value: "2", color: "" },
	{ value: "3", color: "" },
	{ value: "+", color: css.orange },
	{ value: "0", color: "" },
	{ value: ".", color: "" }
];

const CalcButton = (el: { value: string; color?: string; onClick: () => void }) => {
	return (
		<button className={cn(css.btn, el?.color)} onClick={el.onClick}>
			{el.value}
		</button>
	);
};

export function Calculator() {
	const [expr, setExpr] = useState("");
	const [result, setResult] = useState<string>("");
	const [error, setError] = useState<CalcError | null>(null);

	const allowedKey = useMemo(() => {
		return new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "+", "-", "*", "/", "(", ")"]);
	}, []);

	const append = (s: string) => {
		setExpr((prev) => prev + s);
		setError(null);
	};

	const backspace = () => {
		setExpr((prev) => prev.slice(0, -1));
		setError(null);
	};

	const clearAll = () => {
		setExpr("");
		setResult("");
		setError(null);
	};

	const onEquals = () => {
		try {
			const v = evaluate(expr);
			setResult(formatNumber(v));
			setError(null);
		} catch (e) {
			const message = e instanceof Error ? e.message : "Invalid expression";
			setError({ message });
			setResult("");
		}
	};

	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Enter") {
				e.preventDefault();
				onEquals();
				return;
			}
			if (e.key === "Backspace") {
				e.preventDefault();
				backspace();
				return;
			}
			if (e.key === "Escape") {
				e.preventDefault();
				clearAll();
				return;
			}
			if (allowedKey.has(e.key)) {
				e.preventDefault();
				append(e.key);
			}
		};

		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [allowedKey, expr]);

	return (
		<div className={css.calculator}>
			<div className={css.display}>
				<div className={css.expr}>{expr || "0"}</div>
				<div className={css.result}>{result}</div>
				{error ? <div className={css.error}>{error.message}</div> : null}
			</div>

			<div className={css.grid}>
				<CalcButton value="C" color={css.grey} onClick={clearAll} />
				{buttons.map((button) => (
					<CalcButton
						value={button.value}
						color={cn(css.btn, button.color)}
						key={button.value}
						onClick={() => append(button.value)}
					/>
				))}
				<CalcButton value={"⌫"} onClick={backspace} />
				<CalcButton value={"="} color={css.orange} onClick={onEquals} />
			</div>
		</div>
	);
}
