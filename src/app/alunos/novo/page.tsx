"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import MensagemErro from "@/components/MensagemErro";
import { useApp } from "@/context/AppContext";

export default function NovoAluno() {
  const { adicionarAluno } = useApp();
  const [ra, setRa] = useState("");
  const [nome, setNome] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  function enviar(e: FormEvent) {
    e.preventDefault();
    setSucesso("");
    if (!/^\d+$/.test(ra.trim())) { setErro("O RA deve conter apenas números."); return; }
    const r = adicionarAluno(Number(ra.trim()), nome);
    if (!r.ok) { setErro(r.erro); return; }
    setErro("");
    setSucesso(`Aluno ${nome.trim()} cadastrado com sucesso.`);
    setRa(""); setNome("");
  }

  return (
    <>
      <h1>Novo aluno</h1>
      <form onSubmit={enviar} className="form">
        <label>RA<input inputMode="numeric" value={ra} onChange={(e) => setRa(e.target.value)} required /></label>
        <label>Nome completo<input value={nome} onChange={(e) => setNome(e.target.value)} required /></label>
        {erro && <MensagemErro texto={erro} />}
        {sucesso && <p role="status" className="sucesso">{sucesso}</p>}
        <button type="submit" className="botao">Cadastrar</button>
      </form>
      <p><Link href="/alunos" className="link">← Voltar à listagem</Link></p>
    </>
  );
}
