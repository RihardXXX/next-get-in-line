import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Главная страница",
};

export default function Home() {
  return (
    <main className="min-h-screen pb-20 overflow-auto">
      <h1>Домашняя страница</h1>
    </main>
  );
}
