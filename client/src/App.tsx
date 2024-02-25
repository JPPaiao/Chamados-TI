import { Dashboard } from "./page/dashboard"
import { MagicMotion } from "react-magic-motion";

function App() {
  return (
    <MagicMotion>
      <div className='text-2xl text-black flex flex-col w-screen h-screen'>
        <Dashboard />
      </div>
    </MagicMotion>
  )
}

export default App
