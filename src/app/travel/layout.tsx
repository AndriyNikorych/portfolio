import { ReactNode } from "react";
import { TravelFont } from "@/assets/fonts";

export default function Layout({ children }: { children: ReactNode }) {
	return <div className={TravelFont.variable}>{children}</div>;
}
