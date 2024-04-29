import { Metadata } from "next";
import Wrap from "@/components/base/wrap";

export const metadata: Metadata = {
    title: "Личный кабинет главная",
    description: "Страница личный кабинета главная",
};
export default function Home() {
    return (
        <Wrap>
            <h1>Личный кабинет</h1>
        </Wrap>
    );
}
