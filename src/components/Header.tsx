import css from "@css/component/header.module.scss";
import FolderIcon from "@/assets/svg/folder.svg";

export function Header() {
	return (
		<header className={css.header}>
			<div className={css.headerContent}>
				<div className={css.aboutMe}>
					<FolderIcon className={css.folderIcon} />
					<div className={css.portfolio}>My portfolio</div>
				</div>
				<nav className={css.navigation}>
					<ul className={css.menu}>
						<li className={css.menuItem}>info</li>
						<li className={css.menuItem}>projects</li>
						<li className={css.menuItem}>contacts</li>
					</ul>
				</nav>
			</div>
		</header>
	);
}
