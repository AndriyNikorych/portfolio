import Icon from "@/assets/svg/travel/travel-icon.svg";
import { IconButton } from "@/components/IconButton/IconButton";
import { useTranslation } from "@/i18n/useTranslation";
import { Config } from "@/utilities/config";
import { useRouter } from "next/navigation";

export function TravelIcon() {
	const router = useRouter();
	const t = useTranslation();

	const onClick = () => {
		router.push(Config.navigationScheme.travel);
	};

	return <IconButton icon={<Icon />} onClick={onClick} label={t("app.travel")} />;
}
