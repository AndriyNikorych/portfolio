import css from "@css/pages/home.module.scss";
import {Header} from "@/components/Header";
import {AboutMe} from "@/app/home/components/AboutMe";

export function HomePage() {
    return <div className={css.root}>
        <Header/>
        <div className={css.content}>
            <AboutMe/>
        </div>
    </div>
}