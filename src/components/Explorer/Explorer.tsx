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
	const [pos, setPos] = useState({ x: 0, y: 0 });
	const dragState = useRef({
		dragging: false,
		pointerId: 0,
		startX: 0,
		startY: 0,
		originX: 0,
		originY: 0
	});

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

		timeline.current = gsap.timeline({ ease: "power3.inOut" });

		timeline.current.set(el, { x: dx, y: dy, scale: 0, opacity: 0 }).to(el, {
			duration: 0.4,
			x: 0,
			y: 0,
			scale: 1,
			opacity: 1
		});
	}, []);

	const handleCloseClick = () => {
		const el = ref.current;
		const iconEl = iconRef?.current;

		if (el && iconEl && timeline.current) {
			const iconRect = iconEl.getBoundingClientRect();
			const winRect = el.getBoundingClientRect();

			const x = iconRect.left - window.innerWidth / 2;
			const y = window.innerHeight - winRect.height - 120;

			timeline.current.fromTo(
				el,
				{ x: pos.x, y: pos.y },
				{
					duration: 0.4,
					x: x,
					y: y,
					scale: 0,
					opacity: 0,
					onComplete: () => {
						onClose?.();
					}
				}
			);
		} else {
			onClose?.();
		}
	};

	const onExplorerClick = (el: React.MouseEvent<HTMLDivElement>) => {
		el.currentTarget.focus();
	};

	const onFullSize = () => {
		setFullSize(!fullSize);
		setPos({ x: 0, y: 0 });
	};

	const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
		if (fullSize || e.button !== 0) return;

		e.currentTarget.setPointerCapture(e.pointerId);

		dragState.current = {
			dragging: true,
			pointerId: e.pointerId,
			startX: e.clientX,
			startY: e.clientY,
			originX: pos.x,
			originY: pos.y
		};

		const onMove = (ev: PointerEvent) => {
			if (!dragState.current.dragging || ev.pointerId !== dragState.current.pointerId || !ref.current)
				return;

			const dx = ev.clientX - dragState.current.startX;
			const dy = ev.clientY - dragState.current.startY;

			const maxTop = window.innerHeight - ref.current?.offsetHeight - 120;
			const y = Math.min(dragState.current.originY + dy, maxTop);

			setPos({
				x: dragState.current.originX + dx,
				y: y
			});
		};

		const onUp = (ev: PointerEvent) => {
			if (ev.pointerId !== dragState.current.pointerId) return;

			dragState.current.dragging = false;
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("pointerup", onUp);
		};

		window.addEventListener("pointermove", onMove);
		window.addEventListener("pointerup", onUp);
	};

	return (
		<div
			className={css.explorer}
			ref={ref}
			style={{
				["--width"]: fullSize ? "100%" : "600px",
				["--height"]: fullSize ? "calc(100vh - 120px)" : "max-content",
				transform: `translateX(-50%) translate(${pos.x}px, ${pos.y}px)`
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
				<div className={css.fullSize} onClick={onFullSize}>
					<div className={css.icon}>
						<ArrowUpDown />
					</div>
				</div>
				<div className={css.dragAndDrop} onPointerDown={onPointerDown}></div>
			</div>

			<div className={css.content}>{children}</div>
		</div>
	);
}
