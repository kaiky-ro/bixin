'use client'
import { useState } from 'react';
import { supabase } from './lib/supabase';

export default function Home(){
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [msg, setMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const {error} = await supabase.auth.signUp({email, password: senha, options: {data: {nome}}})

    if(error){
      setMsg('Erro ao salvar: ' + error.message)
    }else{
      setMsg('Cadastro realizado')
      setNome('')
      setEmail('')
      setSenha('')
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
        <input
        type = 'password'
        placeholder = 'Senha'
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        minLength={8}
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