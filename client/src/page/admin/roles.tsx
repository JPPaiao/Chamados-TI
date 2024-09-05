import { useLoaderData } from "react-router"
import { ListTable } from "../../components/listTable"
import { httpClientFactory, HttpRequest } from "../../services/server"
import { useState } from "react"
import { DialogModal } from "../../components/dialog"

interface RolesProps {
  id: string,
  name: string,
  description: string
}

const HEADS = {
  id: "Id",
  name: "Nome",
  description: "Descrição",
  "": ""
}

async function loader() {
  const datas: HttpRequest = {
    method: "get",
    url: 'roles',
  }
  const responseFetchAPI = await httpClientFactory().request(datas)

  return responseFetchAPI ? responseFetchAPI : null
}

function Roles() {
  const rolesLoader = useLoaderData() as RolesProps[]
  const [roles, setRoles] = useState<RolesProps[]>(rolesLoader)
  const [selectorRole, setSelectorRoles] = useState<RolesProps | null>(null)
  const filterSearch = ['name', 'description']

  const [size, setSize] = useState<string | undefined>(undefined)
  const handleOpen = (value: string | undefined) => setSize(value)

  const handleDelet = async () => {
    const datas: HttpRequest = {
      method: "delete",
      url: `roles/delete`,
      body: JSON.stringify({ id: selectorRole?.id }),
      headers: {
        "Content-Type": "application/json"
      }
    }

    await httpClientFactory().request(datas)
    setSelectorRoles(null)
    await handleReload()
  }

  const handleReload = async () => {
    const datas: HttpRequest = {
      method: "get",
      url: "roles"
    }
    
    const responseFetchAPI = await httpClientFactory().request(datas)
    setRoles(responseFetchAPI)
  }

  const datasRoles = {
    heads: HEADS,
    body: roles,
    add: 'papeis',
    filterSearch: filterSearch,
    select: setSelectorRoles,
    openModal: handleOpen
  }
  
  return (
    <div className="px-4 py-5">
      <DialogModal handleOpen={handleOpen} size={size} onClickButton={handleDelet} />
      <ListTable<RolesProps> datas={datasRoles}  />
    </div>
  )
}

export { Roles, loader }