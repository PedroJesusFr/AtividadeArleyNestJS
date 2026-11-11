import Link from "next/link";

export default function Home() {
  return (
    <section>
      <h1>Sistema Acadêmico</h1>
      <p className="lead">
        Este sistema permite consultar e cadastrar alunos e matrículas, além de consultar o catálogo de disciplinas do curso.
      </p>
      <div className="atalhos">
        <Link href="/alunos" className="atalho" data-area="alunos"><strong>Alunos</strong><span>Consulte e cadastre alunos.</span></Link>
        <Link href="/disciplinas" className="atalho" data-area="disciplinas"><strong>Disciplinas</strong><span>Veja o catálogo de disciplinas.</span></Link>
        <Link href="/matriculas" className="atalho" data-area="matriculas"><strong>Matrículas</strong><span>Consulte e registre matrículas.</span></Link>
      </div>
    </section>
  );
}
