
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  IconButton,
  Tooltip,
} from "@material-tailwind/react"
import { RootState } from "../store/store"
import { ChangeEvent, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { PencilIcon } from "./icons/pencil"
import { ChevronUpDownIcon } from "./icons/chevronupdown"
import { MagnifyingGlassIcon } from "./icons/magnifyingglassIcon"

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Monitored",
    value: "monitored",
  },
  {
    label: "Unmonitored",
    value: "unmonitored",
  },
]
 
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

function SortableTable() {
  const user = useSelector((state: RootState) => state.users)
  const [tableUsers, setTableUsers] = useState<LoaderUsers[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  useEffect(() => {
    const usersEffect = async () => {
      const response = await fetch('http://localhost:3000/api/users', {
        method: "get",
        headers: {
          "authorization": user?.user?.token as string
        }
      }).then(d => d.json())

      setTableUsers(response)
    }

    usersEffect()
  }, [user])

  const filteredTable = tableUsers.filter((item) =>
    item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.setor?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card placeholder className="w-full px-4 py-5 overflow-auto mt-2 shadow-none border">
      <CardHeader placeholder floated={false} shadow={false} className="rounded-none ">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row pt-1">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader placeholder>
              {TABS.map(({ label, value }) => (
                <Tab placeholder key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
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
              ({ username, email, setor, status }, index) => {
                const isLast = index === tableUsers.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={username}>
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
                      <Tooltip content="Edit User">
                        <IconButton placeholder variant="text">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
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

export { SortableTable }