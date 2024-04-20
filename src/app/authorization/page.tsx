import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Авторизация",
  description: "Страница авторизации",
};
export default function Authorization() {
  return (
    <main className="min-h-screen pb-20 overflow-auto">
      <h1>Авторизация</h1>
    </main>
  );
}