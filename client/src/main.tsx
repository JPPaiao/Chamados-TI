import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { 
  Login, 
  action as loginAction, 
  loader as loginLoader 
} from './page/login.tsx'
import { Dashboard } from './page/dashboard.tsx'
import { Process } from './components/process.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
// import { PrivateRoutes } from './router/privateRoutres.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    action: loginAction,
    loader: loginLoader
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
        path: "teste",
        // element: <PrivateRoutes role='admin' />
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
