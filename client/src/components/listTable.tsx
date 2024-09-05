import { Button, Card, CardBody, CardFooter, CardHeader, Chip, IconButton, Input, Tooltip, Typography } from "@material-tailwind/react"
import { Link } from "react-router-dom"
import { MagnifyingGlassIcon } from "./icons/magnifyingglassIcon"
import { ChevronUpDownIcon } from "./icons/chevronupdown"
import { PencilIcon } from "./icons/pencil"
import { TrashIcon } from "./icons/trash"
import { ChangeEvent, useState } from "react"

interface ListTableProps<T> {
  heads: any,
  body: T[],
  add: string
  filterSearch?: string[],
  select: (user: T) => void,
  openModal: (size: string) => void
}

function ListTable<T>({ datas }, arg: T) {
  const { heads, body, filterSearch, add, select, openModal } = datas as ListTableProps<typeof arg>
  const { id, ...resHeads } = heads

  const [search, serSearch] = useState('')

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    serSearch(event.target.value)
  }

  const filteredTable = body?.filter(item => 
    !search 
    ? item
    : Object.keys(item).some(key => {
      if (filterSearch?.includes(key)) {
        return item[key].toLowerCase().includes(search.toLowerCase())
      }
    })
  )

  return (
    <>
      <Card placeholder className="shadow-none border-none">
        <CardHeader placeholder floated={false} shadow={false} className="rounded-none ">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row pt-1">
            <div>
              <Link to={`/dashboard/admin/${add}/add`}>
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
                {
                  Object.keys(resHeads).map((head, index) => (
                    <th
                      key={head}
                      className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                    >
                      <Typography placeholder
                        variant="small"
                        color="blue-gray"
                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                      >
                        {resHeads[head]}{" "}
                        {index !== resHeads.length - 1 && (
                          <ChevronUpDownIcon className="h-4 w-4" />
                        )}
                      </Typography>
                    </th>
                  ))
                }
              </tr>
            </thead>
            <tbody>
              {filteredTable.map(
                (datas, index) => {
                  const isLast = index === body.length - 1
                  const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50"
                  return (
                    <tr key={index}>
                      {
                        Object.keys(resHeads).map(key => (
                            key !== '' &&
                            <>
                              <td className={classes} key={key}>
                                {
                                  key !== 'status'
                                  ? (
                                      <div className="flex items-center gap-3">
                                        <div className="flex flex-col">
                                          <Typography 
                                            placeholder
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                          >
                                            {datas[key]}
                                          </Typography>
                                        </div>
                                      </div>
                                  ) : (
                                    <Chip
                                      variant="ghost"
                                      size="sm"
                                      value={key !== 'status' ? "online" : "offline"}
                                      color={key !== 'status' ? "green" : "blue-gray"}
                                    />
                                  )
                                }
                              </td>
                            </>
                          )
                        )
                      }
                      <td className="p-2 border-b border-blue-gray-50">
                        <Tooltip content="Editar">
                          <IconButton placeholder variant="text">
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Deletar">
                          <IconButton placeholder variant="text" 
                          onClick={() => {
                              select(datas)
                              openModal("sm")
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
    </>
  )
}

export { ListTable }