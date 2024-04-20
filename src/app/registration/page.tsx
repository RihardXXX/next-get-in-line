import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Регистрация",
  description: "Страница регистрации",
};
export default function Registration() {
  "use client";
  return (
    <main className="min-h-screen pb-20 overflow-auto">
      <h1>Регистрация</h1>
    </main>
  );
}