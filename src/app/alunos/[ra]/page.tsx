"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useApp } from "@/context/AppContext";

export default function DetalhesAluno() {
  const { ra } = useParams<{ ra: string }>();
  const { alunos, pronto } = useApp();
  if (!pronto) return <p>Carregando...</p>;
  const aluno = /^\d+$/.test(ra) ? alunos.find((a) => a.ra === Number(ra)) : undefined;

  if (!aluno) {
    return (
      <>
        <h1>Aluno não encontrado</h1>
        <p>Não existe aluno com o RA informado.</p>
        <Link href="/alunos" className="link">← Voltar à listagem</Link>
      </>
    );
  }
  return (
    <>
      <h1>{aluno.name}</h1>
      <dl className="detalhes">
        <dt>RA</dt><dd>{aluno.ra}</dd>
        <dt>Nome completo</dt><dd>{aluno.name}</dd>
      </dl>
      <Link href="/alunos" className="link">← Voltar à listagem</Link>
    </>
  );
}
