"use client";
import { Laptop, Mobile, Tablet } from "@/components/Home/components/Devices";
import css from "@css/pages/Home/developmentProcess.module.scss";
import { useTranslation } from "@/i18n/i18nProvider";
import Image from "next/image";
import { Card } from "@/components/Home/components/Card";
import { useRef } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Performance, PerformanceHandle } from "@/components/Home/components/Performance";
import cn from "classnames";
import { useDevelopmentProcessAnimation } from "@/components/Home/hooks/useDevelopmentProcessAnimation";
import { TitleBlock } from "@/components/Home/components/TitleBlock";

export function DevelopmentProcess() {
	const t = useTranslation();
	const sectionRef = useRef<HTMLDivElement>(null);
	const messages1Ref = useRef<HTMLDivElement>(null);
	const messages2Ref = useRef<HTMLDivElement>(null);
	const step1Ref = useRef<HTMLDivElement>(null);
	const step2Ref = useRef<HTMLDivElement>(null);
	const step3Ref = useRef<HTMLDivElement>(null);
	const step4Ref = useRef<HTMLDivElement>(null);
	const step5Ref = useRef<HTMLDivElement>(null);
	const laptopRef = useRef<HTMLDivElement>(null);
	const tabletRef = useRef<HTMLDivElement>(null);
	const mobileRef = useRef<HTMLDivElement>(null);
	const performanceRef = useRef<PerformanceHandle>(null);
	const progressRef = useRef<HTMLDivElement>(null);
	const progressFillRef = useRef<HTMLDivElement>(null);

	useDevelopmentProcessAnimation({
		sectionRef,
		messages1Ref,
		messages2Ref,
		step1Ref,
		step2Ref,
		step3Ref,
		step4Ref,
		step5Ref,
		laptopRef,
		tabletRef,
		mobileRef,
		performanceRef,
		progressRef,
		progressFillRef
	});

	return (
		<section className={css.developmentProcess} ref={sectionRef}>
			<TitleBlock
				sectionName={t("home.developmentProcessSection")}
				title={t("home.developmentProcessTitle1")}
				subTitle={t("home.developmentProcessTitle2")}
			/>

			<div className={css.canvas}>
				<div className={css.progress} ref={progressRef}>
					<div className={css.progressTrack}>
						<div className={css.progressFill} ref={progressFillRef}></div>
					</div>
					{Array.from({ length: 5 }).map((_, index) => (
						<div className={css.progressDot} style={{ left: `${index * 25}%` }} key={index}></div>
					))}
				</div>
				<div className={cn(css.stepsTitleBlock, css.step1TitleBlock)} ref={step1Ref}>
					<span className={css.stepNumber}>{t("home.step") + " 1"}</span>
					<h3 className={css.title}>{t("home.stepTitle1")}</h3>
					<h3 className={css.subTitle}>{t("home.stepSubtitle1")}</h3>
				</div>

				<div className={css.messages} ref={messages1Ref}>
					<div className={css.client}>
						<div className={css.user}>
							<div className={css.avatar}>
								<Image
									src={"/images/client.webp"}
									alt={"client avatar"}
									width={150}
									height={150}
									className={css.image}
								/>
							</div>

							<span className={css.name}>{t("global.client")}</span>
						</div>

						<Card className={css.message}>
							<span>{t("home.clientsTask")}</span>
							<div className={css.messageInfo}>
								<span className={css.name}>{t("global.client")}</span>
								<span>13:41</span>
							</div>
						</Card>
					</div>

					<div className={css.dev}>
						<div className={css.user}>
							<div className={css.avatar}>
								<Image
									src={"/images/avatar-hero.webp"}
									alt={"developer avatar"}
									width={150}
									height={150}
									className={css.image}
								/>
							</div>

							<span className={css.name}>{t("home.name")}</span>
						</div>

						<Card className={css.message}>
							<span>{t("home.devText")}</span>
							<div className={css.messageInfo}>
								<span className={css.name}>{t("home.name")}</span>
								<span>13:45</span>
							</div>
						</Card>
					</div>
				</div>

				<div className={css.stepsTitleBlock} ref={step2Ref}>
					<span className={css.stepNumber}>{t("home.step") + " 2"}</span>
					<h3 className={css.title}>{t("home.stepTitle2")}</h3>
					<h3 className={css.subTitle}>{t("home.stepSubtitle2")}</h3>
				</div>

				<div className={css.stepsTitleBlock} ref={step3Ref}>
					<span className={css.stepNumber}>{t("home.step") + " 3"}</span>
					<h3 className={css.title}>{t("home.stepTitle3")}</h3>
					<h3 className={css.subTitle}>{t("home.stepSubtitle3")}</h3>
				</div>

				<div className={css.stepsTitleBlock} ref={step4Ref}>
					<span className={css.stepNumber}>{t("home.step") + " 4"}</span>
					<h3 className={css.title}>{t("home.stepTitle4")}</h3>
					<h3 className={css.subTitle}>{t("home.stepSubtitle4")}</h3>
				</div>

				<div className={css.stepsTitleBlock} ref={step5Ref}>
					<span className={css.stepNumber}>{t("home.step") + " 5"}</span>
					<h3 className={css.title}>{t("home.stepTitle5")}</h3>
					<h3 className={css.subTitle}>{t("home.stepSubtitle5")}</h3>
				</div>

				<div className={css.laptop} ref={laptopRef}>
					<Laptop>
						<div className={css.lottieAnimation}>
							<DotLottieReact src="/lottie/webProcess.json" loop autoplay />
						</div>

						<div className={css.site}>
							<Image
								src={"/images/site/laptop.webp"}
								alt={"screen"}
								width={1200}
								height={1184}
								sizes="(max-width: 768px) 90vw, 60vw"
								className={css.image}
							/>
						</div>

						<Performance ref={performanceRef} />
					</Laptop>
				</div>
				<div className={css.tablet} ref={tabletRef}>
					<Tablet />
				</div>
				<div className={css.mobile} ref={mobileRef}>
					<Mobile />
				</div>

				<div className={css.messages} ref={messages2Ref}>
					<div className={css.client}>
						<div className={css.user}>
							<div className={css.avatar}>
								<Image
									src={"/images/client.webp"}
									alt={"client avatar"}
									width={150}
									height={150}
									className={css.image}
								/>
							</div>

							<span className={css.name}>{t("global.client")}</span>
						</div>

						<Card className={css.message}>
							<span>{t("home.clientsReaction")}</span>
							<div className={css.messageInfo}>
								<span className={css.name}>{t("global.client")}</span>
								<span>17:41</span>
							</div>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
