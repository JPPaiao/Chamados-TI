import ReactDOM from 'react-dom/client'
import './index.css'
import { ThemeProvider } from '@material-tailwind/react'
import { Provider } from 'react-redux'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { 
  Login, 
  action as loginAction, 
  loader as loginLoader 
} from './page/login.tsx'
import { 
  Dashboard,
  loader as dashboardLoader
} from './page/dashboard.tsx'
import { 
  PrivateRoutes,
  loader as privateRoutesLoader
} from './router/privateRoutres.tsx'
import { 
  FormAdd, 
  action as formDataAction 
} from './components/formAdd.tsx'
import { Process } from './components/process.tsx'
import { store } from './store/store.ts'
import { Unauthorized } from './page/unauthorized.tsx'

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
    loader: dashboardLoader,
    children: [
      {
        path: "unauthorized",
        element: <Unauthorized />
      },
      {
        path: "process",
        element: <Process />
      },
      {
        path: "add",
        element: <PrivateRoutes role={['admin', 'gerentes']} />,
        loader: privateRoutesLoader,
        children: [
          {
            path: "addProcess",
            element: <FormAdd />,
            action: formDataAction,
          }
        ]
      },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
)
