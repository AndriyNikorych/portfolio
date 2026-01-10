import css from "@css/component/header.module.scss";
import {Image} from "next/dist/client/image-component";

export function Header() {
    return <header className={css.header}>
        <div className={css.aboutMe}>
            <Image src={"/images/react-logo.webp"} alt={"react-logo"} width={50} height={50} objectFit={"cover"}/>
            <div className={css.aboutMeText}>
                <div className={css.position}>React developer</div>
                <div className={css.name}>NIKORYCH ANDRIY</div>
            </div>
        </div>
        <nav className={css.navigation}>
            <ul className={css.menu}>
                <li className={css.menuItem}>info</li>
                <li className={css.menuItem}>projects</li>
                <li className={css.menuItem}>contacts</li>
            </ul>
        </nav>
    </header>
}