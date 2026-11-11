import Link from "next/link";

export default function NotFound() {
  return (
    <section>
      <h1>Página não encontrada</h1>
      <p>O endereço que você acessou não existe.</p>
      <p><Link href="/" className="link">← Voltar ao início</Link></p>
    </section>
  );
}
