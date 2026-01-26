import { useTheme } from "next-themes";
import css from "@css/component/themeSwitcher.module.scss";
import Sun from "@/assets/svg/sun.svg";
import Moon from "@/assets/svg/moon.svg";

export function ThemeSwitcher({ onClose }: { onClose: () => void }) {
	const { resolvedTheme, setTheme } = useTheme();

	const onCLick = () => {
		onClose();
		setTheme(resolvedTheme === "light" ? "dark" : "light");
	};

	return (
		<button onClick={onCLick} className={css.themeSelector}>
			<Sun className={css.sun} />
			<Moon className={css.moon} />
		</button>
	);
}
