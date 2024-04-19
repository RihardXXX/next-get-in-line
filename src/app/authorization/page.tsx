import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Авторизация",
  description: "Страница авторизации",
};
export default function Authorization() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Авторизация</h1>
    </div>
  );
}