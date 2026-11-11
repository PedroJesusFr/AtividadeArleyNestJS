"use client";

import Link from "next/link";
import { useApp } from "@/context/AppContext";

export default function ListaAlunos() {
  const { alunos } = useApp();
  return (
    <>
      <h1>Alunos</h1>
      <p className="total">Total de alunos: <strong>{alunos.length}</strong></p>
      {alunos.length === 0 ? <p>Nenhum aluno cadastrado.</p> : (
        <ul className="lista">
          {alunos.map((a) => (
            <li key={a.ra}>
              <Link href={`/alunos/${a.ra}`}><span>{a.name}</span><span className="ra">RA {a.ra}</span></Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
