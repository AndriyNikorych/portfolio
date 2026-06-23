import css from "@css/pages/Home/home.module.scss";
import { Header } from "@/components/Home/components/Header";
import { HeroSection } from "@/components/Home/components/HeroSection/HeroSection";
import { Skills } from "@/components/Home/components/Skills";
import { RefactoringCase } from "@/components/Home/components/RefactoringCase";
import { SeniorExpertiseCards } from "@/components/Home/components/SeniorExpertiseCards";
import { DevelopmentProcess } from "@/components/Home/components/DevelopmentProcess";
import { PortfolioList } from "@/components/Home/components/PortfolioList";

export function Home() {
	return (
		<div className={css.root}>
			<div className={css.home}>
				<Header />
				<HeroSection />
				<Skills />
				<RefactoringCase />
				<DevelopmentProcess />
				<PortfolioList />
				<SeniorExpertiseCards />
			</div>
		</div>
	);
}
