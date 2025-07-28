'use client'
import { useEffect, useState } from "react"

export default function Dashboard() {
  const [respostaIA, setRespostaIA] = useState("")

  useEffect(() => {
    const obterResposta = async () => {
      try {
        const resposta = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: 'Crie uma rotina semanal para estudos' }),
        });

        const resultado = await resposta.json();
        setRespostaIA(resultado.choices[0].message.content);
      } catch (err) {
        console.error('Erro ao obter resposta da IA:', err);
        setRespostaIA('Erro ao gerar rotina.');
      }
    };

    obterResposta();
  }, []);

  return (
    <main>
      <h1>Dashboard</h1>
      <p><strong>Rotina sugerida:</strong></p>
      <pre>{respostaIA}</pre>
    </main>
  );
}
