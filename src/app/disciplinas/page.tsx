import { disciplinas } from "@/data/disciplinas";

export default function Disciplinas() {
  return (
    <div className="area disciplinas" data-area="disciplinas">
      <div className="area-corpo">
        <h1>Disciplinas</h1>
        <p className="total">Total de disciplinas: <strong>{disciplinas.length}</strong></p>
        <div className="cartoes">
          {disciplinas.map((d) => (
            <article key={d.id} className="cartao">
              <span className="cartao-id">ID {d.id}</span>
              <h2>{d.name}</h2>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
