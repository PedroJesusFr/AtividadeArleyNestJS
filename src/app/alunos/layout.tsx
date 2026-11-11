"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/alunos", label: "Lista de alunos" },
  { href: "/alunos/novo", label: "Novo aluno" },
];

export default function AlunosLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="area alunos" data-area="alunos">
      <aside className="lateral" aria-label="Menu de alunos">
        <h2>Alunos</h2>
        {links.map((l) => {
          const ativo = l.href === "/alunos" ? pathname === "/alunos" || (pathname.startsWith("/alunos/") && pathname !== "/alunos/novo") : pathname === l.href;
          return <Link key={l.href} href={l.href} className={ativo ? "lateral-link ativo" : "lateral-link"} aria-current={ativo ? "page" : undefined}>{l.label}</Link>;
        })}
      </aside>
      <section className="area-corpo">{children}</section>
    </div>
  );
}
