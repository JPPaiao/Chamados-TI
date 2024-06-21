import Logo from "../assets/logo.png"
import { UserIcon } from "./icons/user"

function Header() {
  return (
    <div className="w-full shadow-lg z-50 py-2">
			<div className="px-10 flex justify-end items-center">
				<button className="rounded cursor-pointer hover:border-zinc-200 border-2 border-transparent p-1 transition-all duration-200">
					<UserIcon width="w-6" />
				</button>
			</div>
    </div>
  )
}

export { Header }
