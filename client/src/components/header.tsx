import Logo from "../assets/logo.png"

export interface IAppProps {
}

function Header (props: IAppProps) {
  return (
    <div className="w-full">
			<div className=" md:max-w-[960px] m-auto bg-red-300">
				<div className="">
					<img className="w-28" src={Logo} alt="Logo Atlantis" />
				</div>
			</div>
    </div>
  )
}

export { Header }
