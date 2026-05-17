import { Tahoe } from "@/modules/tahoe/Tahoe";
import { Suspense } from "react";

export default function Page() {
	return (
		<Suspense>
			<Tahoe />
		</Suspense>
	);
}
