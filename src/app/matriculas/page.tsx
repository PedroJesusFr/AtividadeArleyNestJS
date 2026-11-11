"use client";

import Link from "next/link";
import { disciplinas } from "@/data/disciplinas";
import { useApp } from "@/context/AppContext";

export default function Matriculas() {
  const { alunos, matriculas } = useApp();
  return (
    <div className="area matriculas" data-area="matriculas">
      <div className="area-corpo">
        <h1>Matrículas</h1>
        <p className="total">Total de matrículas: <strong>{matriculas.length}</strong></p>
        <p><Link href="/matriculas/nova" className="botao">Nova matrícula</Link></p>
        {matriculas.length === 0 ? <p>Nenhuma matrícula cadastrada.</p> : (
          <div className="tabela-wrap">
            <table className="tabela">
              <thead><tr><th>RA</th><th>Aluno</th><th>Disciplina</th></tr></thead>
              <tbody>
                {matriculas.map((m) => (
                  <tr key={`${m.student_ra}-${m.course_id}`}>
                    <td>{m.student_ra}</td>
                    <td>{alunos.find((a) => a.ra === m.student_ra)?.name ?? "—"}</td>
                    <td>{disciplinas.find((d) => d.id === m.course_id)?.name ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
