import css from "@css/component/explorer.module.scss";
import Cross from "@/assets/svg/cross.svg";
import Line from "@/assets/svg/line.svg";
import ArrowUpDown from "@/assets/svg/arrows-up-down.svg";
import { ReactNode, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePortal } from "@/hooks/usePortal";

type ExplorerType = {
	iconRef?: React.RefObject<HTMLDivElement | null>;
	onClose?: () => void;
	children: ReactNode;
	id: string;
};

export function Explorer({ iconRef, onClose, id, children }: ExplorerType) {
	return usePortal(<ExplorerContent children={children} iconRef={iconRef} id={id} onClose={onClose} />);
}

function ExplorerContent({ iconRef, onClose, children, id }: ExplorerType) {
	const ref = useRef<HTMLDivElement>(null);
	const [fullSize, setFullSize] = useState(false);
	const timeline = useRef<gsap.core.Timeline>(null);

	useEffect(() => {
		const el = ref.current;
		const iconEl = iconRef?.current;

		if (!el || !iconEl) {
			return;
		}

		const winRect = el.getBoundingClientRect();
		const iconRect = iconEl.getBoundingClientRect();

		const winCenterX = winRect.left + winRect.width / 2;
		const winBottomY = winRect.top + winRect.height;
		const iconCenterX = iconRect.left + iconRect.width / 2;

		const dx = iconCenterX - winCenterX;
		const dy = iconRect.top - winBottomY;

		if (timeline.current) timeline.current.kill();

		timeline.current = gsap.timeline({
			defaults: { ease: "power3.inOut" }
		});

		timeline.current.set(el, { x: dx, y: dy }).to(
			el,
			{
				duration: 0.4,
				x: 0,
				y: 0,
				scale: 1,
				opacity: 1
			},
			0
		);
	}, []);

	const handleCloseClick = () => {
		if (timeline.current) {
			timeline.current.reverse();
			timeline.current.eventCallback("onReverseComplete", () => onClose?.());
		} else {
			onClose?.();
		}
	};

	const onExplorerClick = (el: React.MouseEvent<HTMLDivElement>) => {
		el.currentTarget.focus();
	};

	return (
		<div
			className={css.explorer}
			ref={ref}
			style={{
				["--width"]: fullSize ? "100%" : "600px",
				["--height"]: fullSize ? "calc(100vh - 120px)" : "max-content"
			}}
			id={id}
			tabIndex={0}
			onClick={onExplorerClick}
		>
			<div className={css.topBar}>
				<div className={css.close} onClick={handleCloseClick}>
					<div className={css.icon}>
						<Cross />
					</div>
				</div>
				<div className={css.hide} onClick={handleCloseClick}>
					<div className={css.icon}>
						<Line />
					</div>
				</div>
				<div className={css.fullSize} onClick={() => setFullSize(!fullSize)}>
					<div className={css.icon}>
						<ArrowUpDown />
					</div>
				</div>
			</div>

			<div className={css.content}>{children}</div>
		</div>
	);
}
