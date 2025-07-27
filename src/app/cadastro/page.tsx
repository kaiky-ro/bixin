'use client'
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/navigation';

export default function Home(){
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [foco, setFoco] = useState('')
  const [msg, setMsg] = useState('')
  const router = useRouter()

  const opcoesFoco = [
    'Estudos',
    'Exercícios físicos',
    'Sono e bem-estar',
    'Controle do tempo de tela',
    'Leitura'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const {data, error} = await supabase.auth.signUp({email, password: senha, options: {data: {nome}}})

    if(error){
      setMsg('Erro ao salvar: ' + error.message)
      return
    }

    const user = data.user
    if(user){
      const {error: insertError} = await supabase.from('usuarios').insert([
        {
          id: user.id,
          nome,
          email,
          foco
        }
      ])
      if(insertError){
        setMsg('Erro ao salvar')
        return
      }
      setMsg('Cadastro realizado')
      setTimeout(() => router.push('/'), 2000)
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
        <select
        value={foco}
        onChange={(e) => setFoco(e.target.value)}
        required>
          <option value='Como você pretende usar o Bixin?'></option>
          {opcoesFoco.map((opcao) => (
            <option key={opcao} value={opcao}>{opcao}</option>
          ))}
        </select>

        <button type='submit'> 
          Começar
        </button>
        {msg && <p>{msg}</p>}
      </form>
    </main>
  )
}