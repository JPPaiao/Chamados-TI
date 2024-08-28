import { Input } from "@material-tailwind/react"
import { Form, redirect, useSubmit } from "react-router-dom"
import { store } from "../store/store"
import { FormEvent, useState } from "react"

interface UserType {
  username: string | null,
  email: string | null,
  password: string | null,
  sector?: string | null
}

async function action({ request, params }) {
  const user = store.getState().users.user
  const formDataToSend = await request.formData()
  const data = Object.fromEntries(formDataToSend)

  const resonse = await fetch('http://localhost:3000/api/user/create', {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      "authorization": user?.token as string,
      "Content-Type": "application/json"
    }
  })
  .then(d => d.json())

  return redirect('/dashboard/admin/users')
}

function AddUsers() {
  const submit = useSubmit()
  const [error, setError] = useState<string | null>(null)
  const [confirmPassword, setConfirmedPassword] = useState<string>('')
  const [userAdd, setUserAdd] = useState<UserType>({
    username: null,
    email: null,
    password: null,
    sector: null
  })

  const validateForm = (): boolean => {
    if (!userAdd.username || !userAdd.email || !userAdd.password) {
      setError("Todos os campos são obrigatórios")
      return false
    }

    if (userAdd.password !== confirmPassword) {
      setError("As senhas não coincidem")
      return false
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailPattern.test(userAdd.email)) {
      setError("Por favor, insira um email válido")
      return false
    }

    setError(null)
    return true
  }
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    validateForm()

    const formData = new FormData()
    
    formData.append('username', userAdd.username || "")
    formData.append('email', userAdd.email || "")
    formData.append('password', userAdd.password || "")
    
    if (validateForm() && Object.fromEntries(formData)) {            
      submit(formData, { method: 'POST', action: "/dashboard/admin/users/add", encType: "multipart/form-data"})
    }
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}  className="flex flex-col justify-around w-full text-sm py-3 max-w-96 m-auto gap-6 pt-12" >
      <Input name="username" required onChange={(e) => setUserAdd(() => ({...userAdd, username: e.target.value}))} crossOrigin variant="static" label="Nome" color="green" />
      <Input name="email" required onChange={(e) => setUserAdd(() => ({...userAdd, email: e.target.value}))} crossOrigin variant="static" label="Email" color="green" />
      <Input name="password" required onChange={(e) => setUserAdd(() => ({...userAdd, password: e.target.value}))} crossOrigin variant="static" label="Senha" color="green" />
      <Input name="confirmPassword" required onChange={(e) => setConfirmedPassword(() => e.target.value)} crossOrigin variant="static" label="Confirmar senha" color="green" />
      {error && <p className="text-red-800">{error}</p>}
      {/* <Input name="sector" onChange={(e) => setUserAdd(() => ({...userAdd, sector: e.target.value}))} crossOrigin variant="static" label="Setor" color="green" /> */}
      <Input 
        crossOrigin 
        disabled={userAdd.password !== confirmPassword || !userAdd.email || !userAdd.username} 
        type="submit" 
        value='Adicionar processo' 
        className="cursor-pointer hover:bg-green-700 hover:text-white" 
        color="green" 
      />
    </Form>
  )
}

export { AddUsers, action }
