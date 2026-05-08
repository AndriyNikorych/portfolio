import { useEffect, useState } from "react";

type BatteryInfo = { levelPercent: number; charging: boolean } | null;

export function useBattery(): BatteryInfo {
	const [info, setInfo] = useState<BatteryInfo>(null);

	useEffect(() => {
		let batteryRef: any = null;
		let updateRef: (() => void) | null = null;

		const init = async () => {
			if (!("getBattery" in navigator)) return;

			// @ts-expect-error
			const battery = await navigator.getBattery();
			batteryRef = battery;

			const update = () => {
				setInfo({
					levelPercent: Math.round(battery.level * 100),
					charging: battery.charging
				});
			};

			updateRef = update;

			update();
			battery.addEventListener("levelchange", update);
			battery.addEventListener("chargingchange", update);
		};

		init();

		return () => {
			if (!batteryRef || !updateRef) return;
			batteryRef.removeEventListener("levelchange", updateRef);
			batteryRef.removeEventListener("chargingchange", updateRef);
		};
	}, []);

	return info;
}
