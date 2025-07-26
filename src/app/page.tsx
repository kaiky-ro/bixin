'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "./lib/supabase"
import Link from 'next/link'

export default function Home(){
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [msg, setMsg] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    setMsg('')

    const {data, error} = await supabase.auth.signInWithPassword({email, password: senha})

    if(error){
      setMsg('Erro ao logar: ' + error.message)
    }else{
      setMsg('Bem vindo')
      router.push('/dashboard')
    }
  }

  return(
    <main>
      <form onSubmit={handleLogin}>
        <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        required
        />
        <input
        type="password"
        placeholder="Senha"
        onChange={(e) => setSenha(e.target.value)}
        required
        />
        <button type="submit">Login</button>

        {msg && <p>{msg}</p>}
      </form>
      <Link href={'/cadastro'}>Cadastre-se</Link>
      <br/>
      <Link href={'/reset_password'}>Esqueci a senha</Link>
    </main>
  )
}