export default function MensagemErro({ texto }: { texto: string }) {
  return <p role="alert" className="erro">{texto}</p>;
}
