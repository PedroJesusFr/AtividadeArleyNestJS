"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { alunos as alunosIniciais, type Aluno } from "@/data/alunos";
import { matriculas as matriculasIniciais, type Matricula } from "@/data/matriculas";

const CHAVE_ALUNOS = "app:alunos";
const CHAVE_MATRICULAS = "app:matriculas";

type Resultado = { ok: true } | { ok: false; erro: string };

type AppContextType = {
  alunos: Aluno[];
  matriculas: Matricula[];
  pronto: boolean;
  adicionarAluno: (ra: number, nome: string) => Resultado;
  adicionarMatricula: (ra: number, disciplinaId: number) => Resultado;
};

const AppContext = createContext<AppContextType | null>(null);

function salvar(chave: string, valor: unknown): string | null {
  try {
    window.localStorage.setItem(chave, JSON.stringify(valor));
    return null;
  } catch {
    return "Não foi possível salvar os dados no navegador. O cadastro não foi concluído.";
  }
}

function carregar<T>(chave: string): T[] | null {
  try {
    const bruto = window.localStorage.getItem(chave);
    if (!bruto) return null;
    const dados = JSON.parse(bruto);
    return Array.isArray(dados) ? (dados as T[]) : null;
  } catch {
    return null;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [alunos, setAlunos] = useState<Aluno[]>(alunosIniciais);
  const [matriculas, setMatriculas] = useState<Matricula[]>(matriculasIniciais);
  const [pronto, setPronto] = useState(false);
  const alunosRef = useRef<Aluno[]>(alunosIniciais);
  const matriculasRef = useRef<Matricula[]>(matriculasIniciais);

  // Primeiro acesso: usa os arquivos de data/. Depois: lê o que foi salvo no navegador.
  useEffect(() => {
    const a = carregar<Aluno>(CHAVE_ALUNOS);
    const m = carregar<Matricula>(CHAVE_MATRICULAS);
    if (a) { alunosRef.current = a; setAlunos(a); } else salvar(CHAVE_ALUNOS, alunosIniciais);
    if (m) { matriculasRef.current = m; setMatriculas(m); } else salvar(CHAVE_MATRICULAS, matriculasIniciais);
    setPronto(true);
  }, []);

  const adicionarAluno = useCallback((ra: number, nome: string): Resultado => {
    const nomeLimpo = nome.trim();
    if (!Number.isInteger(ra) || ra <= 0) return { ok: false, erro: "Informe um RA numérico válido." };
    if (!nomeLimpo) return { ok: false, erro: "Informe o nome completo do aluno." };
    if (alunosRef.current.some((a) => a.ra === ra)) return { ok: false, erro: `Já existe um aluno com o RA ${ra}.` };
    const novaLista = [...alunosRef.current, { ra, name: nomeLimpo }];
    const erro = salvar(CHAVE_ALUNOS, novaLista);
    if (erro) return { ok: false, erro };
    alunosRef.current = novaLista;
    setAlunos(novaLista);
    return { ok: true };
  }, []);

  const adicionarMatricula = useCallback((ra: number, disciplinaId: number): Resultado => {
    if (!Number.isInteger(ra) || !Number.isInteger(disciplinaId)) return { ok: false, erro: "Selecione um aluno e uma disciplina." };
    if (!alunosRef.current.some((a) => a.ra === ra)) return { ok: false, erro: "Aluno não encontrado." };
    if (matriculasRef.current.some((m) => m.student_ra === ra && m.course_id === disciplinaId))
      return { ok: false, erro: "Este aluno já está matriculado nesta disciplina." };
    const novaLista = [...matriculasRef.current, { student_ra: ra, course_id: disciplinaId }];
    const erro = salvar(CHAVE_MATRICULAS, novaLista);
    if (erro) return { ok: false, erro };
    matriculasRef.current = novaLista;
    setMatriculas(novaLista);
    return { ok: true };
  }, []);

  return (
    <AppContext.Provider value={{ alunos, matriculas, pronto, adicionarAluno, adicionarMatricula }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp deve ser usado dentro de AppProvider");
  return ctx;
}
