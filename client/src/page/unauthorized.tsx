import { Link } from "react-router-dom"

function Unauthorized() {
  return (
    <div>
      <h1>Unauthorized</h1>

      <Link to={"/dashboard"} >Voltar</Link>
    </div>
  )
}

export { Unauthorized }