"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { defaultLocale } from "@/locale/i18n/request";

export default function Page() {
	const router = useRouter();

	useEffect(() => {
		router.replace(`/${defaultLocale}`);
	}, [router]);

	return null;
}
