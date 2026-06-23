import { Travel } from "@/modules/travel/Travel";
import { Suspense } from "react";

export default function Page() {
	return (
		<Suspense>
			<Travel />
		</Suspense>
	);
}
