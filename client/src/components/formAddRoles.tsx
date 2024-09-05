import { Input } from "@material-tailwind/react"
import { Form, redirect, useSubmit } from "react-router-dom"
import { FormEvent, useState } from "react"
import { httpClientFactory, HttpRequest } from "../services/server"

interface UserType {
  name: string | null,
  description: string | null,
}

async function action({ request }) {
  const formDataToSend = await request.formData()
  const data = Object.fromEntries(formDataToSend)

  const datas: HttpRequest = {
    method: "post",
    url: 'roles/create',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  }

  console.log(datas)
  await httpClientFactory().request(datas)

  return redirect('/dashboard/admin/papeis')
}

function AddRoles() {
  const submit = useSubmit()
  const [error, setError] = useState<string | null>(null)
  const [roleAdd, setUserAdd] = useState<UserType>({
    name: null,
    description: null
  })
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData()
    
    formData.append('name', roleAdd.name || "")
    formData.append('description', roleAdd.description || "")

    console.log(formData)
    
    if (Object.fromEntries(formData)) {            
      submit(formData, { method: 'POST', action: "/dashboard/admin/papeis/add", encType: "multipart/form-data"})
    } else setError('Preencha todos os campos')
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}  className="flex flex-col justify-around w-full text-sm py-3 max-w-96 m-auto gap-6 pt-12" >
      <Input name="name" required onChange={(e) => setUserAdd(() => ({...roleAdd, name: e.target.value}))} crossOrigin variant="static" label="Nome" color="green" />
      <Input name="description" required onChange={(e) => setUserAdd(() => ({...roleAdd, description: e.target.value}))} crossOrigin variant="static" label="Descrição" color="green" />
  
      {error && <p className="text-red-800">{error}</p>}

      <Input 
        crossOrigin 
        disabled={!roleAdd.name || !roleAdd.description} 
        type="submit" 
        value='Adicionar processo' 
        className="cursor-pointer hover:bg-green-700 hover:text-white" 
        color="green" 
      />
    </Form>
  )
}

export { AddRoles, action }
