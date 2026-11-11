"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import MensagemErro from "@/components/MensagemErro";
import { disciplinas } from "@/data/disciplinas";
import { useApp } from "@/context/AppContext";

export default function NovaMatricula() {
  const { alunos, adicionarMatricula } = useApp();
  const router = useRouter();
  const [ra, setRa] = useState("");
  const [disc, setDisc] = useState("");
  const [erro, setErro] = useState("");

  function enviar(e: FormEvent) {
    e.preventDefault();
    if (!ra || !disc) { setErro("Selecione um aluno e uma disciplina."); return; }
    const r = adicionarMatricula(Number(ra), Number(disc));
    if (!r.ok) { setErro(r.erro); return; }
    router.push("/matriculas");
  }

  return (
    <div className="area matriculas" data-area="matriculas">
      <div className="area-corpo">
        <h1>Nova matrícula</h1>
        <form onSubmit={enviar} className="form">
          <label>Aluno
            <select value={ra} onChange={(e) => setRa(e.target.value)}>
              <option value="">Selecione um aluno</option>
              {alunos.map((a) => <option key={a.ra} value={a.ra}>{a.name} (RA {a.ra})</option>)}
            </select>
          </label>
          <label>Disciplina
            <select value={disc} onChange={(e) => setDisc(e.target.value)}>
              <option value="">Selecione uma disciplina</option>
              {disciplinas.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </label>
          {erro && <MensagemErro texto={erro} />}
          <button type="submit" className="botao">Cadastrar</button>
        </form>
        <p><Link href="/matriculas" className="link">← Voltar à listagem</Link></p>
      </div>
    </div>
  );
}
