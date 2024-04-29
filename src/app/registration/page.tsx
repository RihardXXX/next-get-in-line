import { Metadata } from "next";
import Wrap from "@/components/base/wrap";

export const metadata: Metadata = {
    title: "Регистрация",
    description: "Страница регистрации",
};
export default function Registration() {
    "use client";
    return (
        <Wrap>
            <h1>Регистрация</h1>
        </Wrap>
    );
}
