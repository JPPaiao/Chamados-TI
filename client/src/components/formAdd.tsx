import React, { useState } from "react"
import { useSelector } from "react-redux"
import { RootState, store } from "../store/store"
import { Input, Textarea } from "@material-tailwind/react"
import { Form, redirect, useSubmit } from "react-router-dom"

interface Process {
	title: string,
	description: string,
	author: string,
  pdfName: string
  pdf: File | null,
}

async function action({ request, params }) {
  const user = store.getState().users.user
  const formDataToSend = await request.formData()

  await fetch('http://localhost:3000/api/procedures/create', {
    method: 'post',
    body: formDataToSend,
    headers: {
      "authorization": user?.token as string
    },
  })
  .then(d => d.json())

  return redirect('/dashboard/process')
}

function FormAdd() {
  const user = useSelector((state: RootState) => state.users.user)
  const submit = useSubmit()
  const [process, setProcess] = useState<Process>({
    title: "",
    description: "",
    author: "",
    pdfName: "",
    pdf: null
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: FileList | null = e.target?.files

		if (file) {
      setProcess(() => ({...process, pdf: file[0], pdfName: file[0].name}))
		}
	}

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault()

    const formData = new FormData()
    
    if (process.title && process.pdf) {
      formData.append('title', process.title)
      formData.append('description', process.description)
      formData.append('author', user?.username as string)
      formData.append('sector', 'setor')
      formData.append('pdfName', process.pdfName)
      formData.append('pdf', process.pdf as File)
    }

    submit(formData, { method: 'POST', action: "/dashboard/add/addProcess", encType: "multipart/form-data"})
  }

  return (
    <Form method="POST" onSubmit={(e: any) => handleSubmit(e)} className="flex flex-col justify-around w-full text-sm py-3 max-w-96 m-auto gap-6 pt-12" >
      <Input name="titulo" required onChange={(e) => setProcess(() => ({...process, title: e.target.value}))} crossOrigin variant="static" label="Títuo" color="green" />
      <Input name="file" required onChange={(e) => handleFileChange(e)} crossOrigin type="file" variant="static" label="Processo em PDF" color="green" />
      <Textarea name="description" required onChange={(e) => setProcess(() => ({...process, description: e.target.value}))} variant="static" label="Descrição" color="green" />
      <Input crossOrigin type="submit" variant="standard" value='Adicionar processo' className="cursor-pointer" color="green" />
    </Form>
  )
}

export { FormAdd, action }