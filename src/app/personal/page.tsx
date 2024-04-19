import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Личный кабинет главная",
  description: "Страница личный кабинета главная",
};
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Личный кабинет</h1>
    </div>
  );
}