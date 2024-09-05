import { Link } from "react-router-dom"
import Logo from "../assets/logo.png"
import { QuestionIcon } from "./icons/question"
import { Can } from "../middleware/can"
import { useState } from "react"
import { Accordion, AccordionBody, AccordionHeader, Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react"
import { ChevronDownIcon } from "./icons/chevrnDown"
import { EnginerIcon } from "./icons/enginer"
import { UserIcon } from "./icons/user"
import { ClipboardDocumentCheck } from "./icons/clipboardDocumentCheck"
import { HomeIcon } from "./icons/home"

function SideBar() {
	const [open, setOpen] = useState(0)
 
  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value)
  }

  return (
		<aside className="py-4 flex justify-center bg-[#00693e] text-white overflow-y-auto fixed z-50 h-[100vh]">
			<div className="w-48 gap-5 flex flex-col">				
				<div className="px-12 py-1">
					<Link to={"/dashboard"}>
						<img className="w-full" src={Logo} alt="Logo Atlantis" />
					</Link>
				</div>
				<Card placeholder className="h-[calc(100vh)-3rem] w-full bg-transparent shadow-none">
					<List placeholder className="min-w-[0px] text-white">
						<Link to={'/dashboard'}>
							<ListItem placeholder className="text-white">
								<ListItemPrefix placeholder>
									<HomeIcon className="h-5 w-5" />
								</ListItemPrefix>
									Home
							</ListItem>
						</Link>
						<Link to={'/dashboard/process'}>
							<ListItem placeholder className="text-white">
								<ListItemPrefix placeholder>
									<QuestionIcon className="h-5 w-5 " />
								</ListItemPrefix>
									Processos
							</ListItem>
						</Link>
						<Can I={['admin']} >
							<Accordion placeholder
								open={open === 1}
								icon={
									<ChevronDownIcon
										className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
									/>
								}
							>
								<ListItem placeholder className="p-0 " selected={open === 1}>
									<AccordionHeader placeholder onClick={() => handleOpen(1)} className="border-b-0 p-3 text-white">
										<ListItemPrefix placeholder>
											<EnginerIcon className="h-5 w-5" />
										</ListItemPrefix>
										<h1 className="text-base font-normal">
											Configuração
										</h1>
									</AccordionHeader>
								</ListItem>
								<AccordionBody className="py-1 ">
									<List placeholder className="p-0 text-white">
										<Link to={'/dashboard/admin/users'}>
											<ListItem placeholder>
												<ListItemPrefix placeholder>
													<UserIcon className="h-4 w-5" />
												</ListItemPrefix>
												Usuários
											</ListItem>
										</Link>
									</List>
									<List placeholder className="p-0 text-white">
										<Link to={'/dashboard/admin/papeis'}>
											<ListItem placeholder>
												<ListItemPrefix placeholder>
													<ClipboardDocumentCheck className="h-4 w-5" />
												</ListItemPrefix>
												Papeis
											</ListItem>
										</Link>
									</List>
								</AccordionBody>
							</Accordion>
						</Can>
					</List>
				</Card>
			</div>
		</aside>
	)
}

export { SideBar }