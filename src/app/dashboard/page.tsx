'use client'

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function Dashboard(){
  const [meta, setMeta] = useState('')
  const [foco, setFoco]  = useState('')
  const [resposta, setResposta] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    const prefUser = async ()=> {
      const {data: {user}} = await supabase.auth.getUser()
      if(!user){
        setMsg('Usuário não autenticado')
        return
      }
      const {data, error} = await supabase
      .from('usuarios')
      .select('foco')
      .eq('id', user.id)
      .single()

      if(error){
        setMsg('Ocorreu um erro')
      }else{
        setFoco(data.foco)
      }
    }
    prefUser()
  }, [])

  const rotina = async () => {
    if(!meta){
      setMsg('Defina uma meta')
      return
    }
    setMsg('Pensando...')
    setResposta('')

    const prompt = `Ajude o usuário com essa demanda: "${meta}". O foco principal do usuário é: "${foco}"`

    try{
      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({prompt}),
      })
      const result = await resp.json()

      if(result?.choices?.[0]?.message?.content){
        setResposta(result.choices[0].message.content)
        setMsg('')
        setMeta('')
      }else{
        setMsg('Ocorreu um erro')
      }
      }catch(err){
        console.error(err)
        setMsg('Ocorreu um erro de comunicação com a IA')
    } 
  }
  const newChat = () => {
    setResposta('')
    setMsg('')
    setMeta('')
  }

  return(
    <main>
      <h1>Olá! Eu sou o Bixin</h1>
      <p>Vamos começar com base nas suas preferências: <strong>{foco}</strong></p>

      <input
      type="text"
      placeholder="Descreva suas metas"
      value={meta}
      onChange={(e) => setMeta(e.target.value)}
      />
      <button onClick={rotina}>Gerar sugestão</button>

      {msg && <p>{msg}</p>}
      {resposta && (
        <div>
          <h2>Essa é a sugestão do Bixin:</h2>
          <pre>{resposta}</pre>
          <button onClick={newChat}>De novo</button>
        </div>
      )}
    </main>
  )
}
