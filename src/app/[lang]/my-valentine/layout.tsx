import { ReactNode } from "react";
import { ValentineFont } from "@/assets/fonts";

export default function Layout({ children }: { children: ReactNode }) {
	return <div className={ValentineFont.variable}>{children}</div>;
}
