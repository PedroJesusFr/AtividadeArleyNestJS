import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import { AppProvider } from "@/context/AppContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sistema Acadêmico",
  description: "Consulta e cadastro de alunos e matrículas, e consulta de disciplinas.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <AppProvider>
          <header className="topo">
            <Link href="/" className="marca">Sistema Acadêmico</Link>
            <Nav />
          </header>
          <main className="conteudo">{children}</main>
          <footer className="rodape">Laboratório de Desenvolvimento Web · Atividade 1 – Rotas e navegação no Next.js</footer>
        </AppProvider>
      </body>
    </html>
  );
}
