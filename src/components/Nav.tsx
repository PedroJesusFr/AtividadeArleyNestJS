"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const itens = [
  { href: "/", label: "Início", area: "home" },
  { href: "/alunos", label: "Alunos", area: "alunos" },
  { href: "/disciplinas", label: "Disciplinas", area: "disciplinas" },
  { href: "/matriculas", label: "Matrículas", area: "matriculas" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Navegação principal" className="nav">
      {itens.map((i) => {
        const ativo = i.href === "/" ? pathname === "/" : pathname === i.href || pathname.startsWith(i.href + "/");
        return (
          <Link key={i.href} href={i.href} data-area={i.area} aria-current={ativo ? "page" : undefined} className={ativo ? "nav-link ativo" : "nav-link"}>
            {i.label}
          </Link>
        );
      })}
    </nav>
  );
}
