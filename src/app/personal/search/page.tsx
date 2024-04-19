import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Личный кабинет поиск",
  description: "Страница личный кабинета поиск",
};
export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Страница поиска</h1>
    </div>
  );
}