import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { Login, action as loginAction } from './page/login.tsx'
import { Dashboard } from './page/dashboard.tsx'
import { Process } from './components/process.tsx'
import { ListCalled } from './components/listCalleds.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    action: loginAction
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "processos",
        element: <Process />
      },
      {
        path: "chamados",
        element: <ListCalled />
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>,
)
