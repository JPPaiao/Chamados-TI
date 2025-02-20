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
  Dashboard
} from './page/dashboard.tsx'
import { 
  PrivateRoutes,
  loader as privateRoutesLoader
} from './router/privateRoutres.tsx'
import { 
  AddProcess, 
  action as formDataAction 
} from './components/formAddProcess.tsx'
import { 
  Process,
  loader as processLoader 
} from './components/process.tsx'
import { 
  Users,
  loader as usersLoader
} from './page/admin/users.tsx'
import { 
  AddUsers,
  action as addUsersAction
} from './components/formAddUsers.tsx'
import { 
  Roles,
  loader as rolesLoader
} from './page/admin/roles.tsx'
import { 
  AddRoles,
  action as addRolesAction
} from './components/formAddRoles.tsx'
import { store } from './store/store.ts'
import { Unauthorized } from './page/unauthorized.tsx'
import { AuthenticRouter } from './router/authenticRouter.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    action: loginAction,
    loader: loginLoader
  },
  {
    path: "/dashboard",
    element: (
      <AuthenticRouter>
        <Dashboard />
      </AuthenticRouter>
    ),
    children: [
      {
        path: "unauthorized",
        element: <Unauthorized />
      },
      {
        path: "process",
        element: <Process />,
        loader: processLoader
      },
      {
        path: "add",
        element: <PrivateRoutes role={['Admin']} />,
        loader: privateRoutesLoader,
        children: [
          {
            path: "addProcess",
            element: <AddProcess />,
            action: formDataAction,
          }
        ]
      },
      {
        path: "admin",
        element: <PrivateRoutes role={['Admin']} />,
        loader: privateRoutesLoader,
        children: [
          {
            path: "users",
            element: <Users />,
            loader: usersLoader
          },
          {
            path: "users/add",
            element: <AddUsers />,
            action: addUsersAction
          },
          {
            path: "papeis",
            element: <Roles />,
            loader: rolesLoader
          },
          {
            path: "papeis/add",
            element: <AddRoles />,
            action: addRolesAction
          },
        ]
      },
    ]
  } 
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
)
