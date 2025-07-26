'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/app/lib/supabase"
import { setDefaultResultOrder } from "node:dns"

export default function DefinirSenha(){
    const [newPasssword, setNewPassword] = useState('')
    const [msg, setMsg] = useState('')
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(
        () =>{
            const sessao = async () =>{
                const{data, error} = await supabase.auth.getSession()
                if (error || !data.session){
                    setMsg('Algo deu errado. Tente novamente')
                }
                setLoading(false)
            }
            sessao()
        }, [])

        const handleNewPassword = async (e: React.FormEvent) => {
            e.preventDefault()
            setMsg('')

            const {error} = await supabase.auth.updateUser({password: newPasssword})
            if(error){
                setMsg('Erro ao atualizar a senha')
            }else{
                setMsg('Senha atualizada')
                setTimeout(() =>{
                    router.push('/')
                }, 2000)
            }}
    return(
        <main>
            <h1>Recuperar senha</h1>
            {loading ? (
                <p>Loading</p>
            ) : (
                 <form onSubmit={handleNewPassword}>
                <input
                type="password"
                placeholder="Nova Senha"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPasssword}
                minLength={8}
                required
                />
                <button type="submit">
                    Atualizar senha
                </button>
                {msg && <p>{msg}</p>}
            </form>
            )} 
        </main>
    )
}