"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function FooterNav() {

  // активный путь
  const pathname = usePathname();

  return <footer>
    <nav className="absolute bottom-0 w-full">
      <ul className="flex justify-between h-20">
        <li>
          <Link className={`link ${pathname === "/" ? "active" : ""}`} href="/">
                        главная
          </Link>
        </li>
        <li>
          <Link className={`link ${pathname === "/registration" ? "active" : ""}`} href="/registration">
                        регистрация
          </Link>
        </li>
        <li>
          <Link className={`link ${pathname === "/registration" ? "active" : ""}`} href="/authorization">
                        авторизация
          </Link>
        </li>
      </ul>
    </nav>
  </footer>;

}