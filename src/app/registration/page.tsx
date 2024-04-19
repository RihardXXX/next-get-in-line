import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Регистрация",
  description: "Страница регистрации",
};
export default function Registration() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Регистрация</h1>
    </div>
  );
}