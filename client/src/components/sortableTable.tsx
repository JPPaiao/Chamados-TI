import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  IconButton,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react"
import { RootState, store } from "../store/store"
import { ChangeEvent, useEffect, useState } from "react"
import { PencilIcon } from "./icons/pencil"
import { ChevronUpDownIcon } from "./icons/chevronupdown"
import { MagnifyingGlassIcon } from "./icons/magnifyingglassIcon"
import { TrashIcon } from "./icons/trash"
import { Form, Link, useLoaderData } from "react-router-dom"
 
const TABLE_HEAD = ["Nome", "Email", "Status", "Setor", ""]

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
  const user = store.getState()

  return user
}

function SortableTable() {
  const user = useLoaderData() as RootState
  const [tableUsers, setTableUsers] = useState<LoaderUsers[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [size, setSize] = useState<string | undefined>(undefined)
  const [idDelet, setIdDelet] = useState<string | null>(null)
  const handleOpen = (value: string | undefined) => setSize(value)

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  useEffect(() => {
    const usersEffect = async () => {
      const response = await fetch('http://localhost:3000/api/users', {
        method: "get",
        headers: {
          "authorization": user?.users?.user?.token  as string
        }
      }).then(d => d.json())

      setTableUsers(response)
    }

    usersEffect()
  }, [user])
  
  const handleDeletUser = async () => {
    if (idDelet) {
      const response = await fetch("http://localhost:3000/api/user/delete", {
        method: "DELETE",
        body: JSON.stringify({ id: idDelet }),
        headers: {
          "authorization": user?.users?.user?.token as string,
          "Content-Type": "application/json"
        }
      }).then(d => d.json())
    }

    setTableUsers((prevUsers) => prevUsers.filter((user) => user.id !== idDelet))
    setIdDelet(null)
  }

  const filteredTable = tableUsers?.filter((item) =>
    item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.setor?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card placeholder className="w-full px-4 py-5 overflow-auto mt-2 shadow-none border-none">
      <Dialog
        placeholder
        open={
          !!size ||
          size === "xs" ||
          size === "sm" ||
          size === "md"
        }
        size={size || "sm"}
        handler={handleOpen}
      >
        <DialogHeader placeholder>Tem certeza que deseja excluir esse usuário</DialogHeader>
        <DialogFooter placeholder>
          <Form method="DELETE" >
            <Button
              placeholder
              variant="text"
              color="red"
              onClick={() => handleOpen(undefined)}
              className="mr-1"
            >
              <span>Cancelar</span>
            </Button>
            <Button
              placeholder
              variant="gradient"
              color="green"
              onClick={() => {
                handleOpen(undefined)
                handleDeletUser()}
              }
            >
              <span>Confirmar</span>
            </Button>
          </Form>
        </DialogFooter>
      </Dialog>
      <CardHeader placeholder floated={false} shadow={false} className="rounded-none ">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row pt-1">
          <div>
            <Link to={'/dashboard/admin/users/add'}>
              <Button placeholder variant="outlined" size="sm">
                  Novo usuário
              </Button>
            </Link>
          </div>
          <div className="w-full md:w-72">
            <Input crossOrigin
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              onChange={(e) => handleSearchChange(e)}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody placeholder className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography placeholder
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}{" "}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredTable.map(
              ({ username, email, setor, status, id }, index) => {
                const isLast = index === tableUsers.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography 
                            placeholder
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {username}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography placeholder
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {email}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={status ? "online" : "offline"}
                          color={status ? "green" : "blue-gray"}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography placeholder
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {setor}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Editar">
                        <IconButton placeholder variant="text">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Deletar">
                        <IconButton placeholder variant="text" 
                        onClick={() => {
                            setIdDelet(id)
                            handleOpen("sm")
                          }}>
                          <TrashIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                )
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter placeholder className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography placeholder variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button placeholder variant="outlined" size="sm">
            Previous
          </Button>
          <Button placeholder variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export { SortableTable, loader }