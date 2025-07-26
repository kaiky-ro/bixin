'use client'

import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function RecuperarSenha(){
    const [email, setEmail] = useState('')
    const [msg, setMsg] = useState('')

    const handleResetPassword = async (e: React.FormEvent) =>{
        e.preventDefault()
        setMsg('')

        const {error} = await supabase.auth.resetPasswordForEmail(email, {redirectTo: 'http://localhost:3000/reset_password/new_password'})
        if(error){
            setMsg('Erro: ' + error.message)
        }else{
            setMsg('Um link de recuperação foi enviado para seu email')
        }
    }
    return(
        <main>
            <form onSubmit={handleResetPassword}>
                <input
                type="email"
                placeholder="Insira seu email"
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                <button type="submit">Enviar</button>
                {msg && <p>{msg}</p>}
            </form>
        </main>
    )
}