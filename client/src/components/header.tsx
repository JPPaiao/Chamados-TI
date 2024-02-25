import Logo from "../assets/logo.png"
import { UserIcon } from "./icons/user"

function Header() {
  return (
    <div className="w-full shadow-lg z-50">
			<div className="px-10 py-2 flex justify-between items-center">
				<div className="">
					<img className="w-28" src={Logo} alt="Logo Atlantis" />
				</div>
				<button className="rounded cursor-pointer hover:bg-green-200 p-2 transition-all duration-200">
					<UserIcon width="w-10" />
				</button>
			</div>
    </div>
  )
}

export { Header }
