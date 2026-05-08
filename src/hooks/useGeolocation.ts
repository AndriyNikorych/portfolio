"use client";

import { useEffect, useState } from "react";

type GeoState =
	| { status: "idle" | "loading"; coords?: never; error?: never }
	| { status: "success"; coords: { lat: number; lon: number }; error?: never }
	| { status: "error"; coords?: never; error: string };

export function useGeolocation(options?: PositionOptions) {
	const [state, setState] = useState<GeoState>({ status: "idle" });

	useEffect(() => {
		if (typeof window === "undefined") return;
		if (!navigator.geolocation) {
			setState({ status: "error", error: "Geolocation is not supported in this browser" });
			return;
		}

		setState({ status: "loading" });

		navigator.geolocation.getCurrentPosition(
			(pos) => {
				setState({
					status: "success",
					coords: { lat: pos.coords.latitude, lon: pos.coords.longitude }
				});
			},
			(err) => {
				setState({ status: "error", error: err.message || "Failed to get geolocation" });
			},
			{ enableHighAccuracy: false, timeout: 10_000, maximumAge: 60_000, ...options }
		);
	}, []);

	return state;
}
