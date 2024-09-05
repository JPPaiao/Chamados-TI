import { useLoaderData } from "react-router-dom"
import { ListTable } from "../../components/listTable"
import { httpClientFactory, HttpRequest } from "../../services/server"
import { DialogModal } from "../../components/dialog"
import { useState } from "react"

const TABLE = {
  id: "Id",
  username: "Nome",
  email: "Email",
  status: "Status",
  sector: "Setor",
  "": ""
}

interface LoaderUsers {
  id: string,
  username: string,
  email: string,
  permissions: Array<object>,
  roles: Array<object>,
  setor: string,
  status: boolean
}

async function loader() {
  const datas: HttpRequest = {
    method: "get",
    url: 'users',
  }
  const responseFetchAPI = await httpClientFactory().request(datas)

  return responseFetchAPI ? responseFetchAPI : null
}

function Users() {
  const tableUsers = useLoaderData() as LoaderUsers[]
  const [users, setUsers] = useState<LoaderUsers[]>(tableUsers)
  const filterSearch = ['username', 'email', 'sector']
  const [selectorUser, setSelectorUser] = useState<LoaderUsers | null>(null)

  const [size, setSize] = useState<string | undefined>(undefined)
  const handleOpen = (value: string | undefined) => setSize(value)

  const handleDelet = async () => {
    const datas: HttpRequest = {
      method: "delete",
      url: `users/delete`,
      body: JSON.stringify({ id: selectorUser?.id }),
      headers: {
        "Content-Type": "application/json"
      }
    }

    await httpClientFactory().request(datas)
    setSelectorUser(null)
    await handleReload()
  }

  const handleReload = async () => {
    const datas: HttpRequest = {
      method: "get",
      url: "users"
    }
    
    const responseFetchAPI = await httpClientFactory().request(datas)
    setUsers(responseFetchAPI)
  }

  const datasUser = {
    add: 'users',
    heads: TABLE,
    body: users,
    filterSearch: filterSearch,
    select: setSelectorUser,
    openModal: handleOpen,
  }

  return (
    <div className="w-full px-4 py-5 overflow-auto mt-2 shadow-none border-none">
      <DialogModal handleOpen={handleOpen} size={size} onClickButton={handleDelet} />
      <ListTable<LoaderUsers> datas={datasUser} /> 
    </div>
  )
}

export { Users, loader }