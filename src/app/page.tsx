'use client'
import { useState } from 'react';
import { supabase } from './lib/supabase';

export default function Home(){
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const {error} = await supabase.from('usuarios').insert([{nome, email}])

    if(error){
      setMsg('Erro ao salvar: ' + error.message)
    }else{
      setMsg('Cadastro realizado')
      setNome('')
      setEmail('')
    }
  }

  return(
    <main>
      <h1>Aproveite seu Bixin</h1>
      <form onSubmit={handleSubmit}>
        <input
        type='text'
        placeholder='Nome'
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
        />
        <input
        type='email'
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        />
        <button type='submit'> 
          Começar
        </button>
        {msg && <p>{msg}</p>}
      </form>
    </main>
  )
}