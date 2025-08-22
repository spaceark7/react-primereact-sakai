import { createBrowserRouter } from 'react-router'
// import Layout from '@/layouts/Layout'
import LandingPage from '@/presentation/views/Landing'
import React from 'react'
import authMiddleware, { redirectMiddleware } from './middleware/AuthMiddleware'
import { ProgressBarIndicator } from './middleware/ProgressBarIndicator'

const routesConfig = {
  future: {
    unstable_middleware: true
  }
}

//#region Pages
//#region Login
const Login = React.lazy(() => import('@/presentation/views/Login'))
//#endregion Login
//#region Layout
const Layout = React.lazy(() => import('@/layouts/Layout'))
//#endregion Layout
//#region Dashboard
const Dashboard = React.lazy(() => import('@/presentation/views/app/Dashboard'))
//#endregion Dashboard
//#region UI Kits
const FormLayout = React.lazy(() =>
  import('@/presentation/views/app/ui-kits/FormLayout')
)
const Datatable = React.lazy(() =>
  import('@/presentation/views/app/ui-kits/Datatable')
)
//#endregion UI Kits
//#region Profile
const Profile = React.lazy(() => import('@/presentation/views/Profile'))
//#endregion Profile
//#region Not Found
const NotFound = React.lazy(() => import('@/presentation/views/NotFound'))
//#endregion Not Found
//#endregion Pages
const routes = createBrowserRouter(
  [
    {
      path: '/',
      Component: LandingPage
    },
    {
      path: '/login',
      Component: Login,
      loader: redirectMiddleware
    },
    //#region App
    {
      path: '/app',
      Component: Layout,
      loader: authMiddleware,
      unstable_middleware: [ProgressBarIndicator],
      children: [
        {
          index: true,
          Component: Dashboard
        },
        {
          path: '/app/uikit',
          children: [
            {
              path: 'formlayout',
              Component: FormLayout
            },
            {
              path: 'datatable',
              Component: Datatable
            }
          ]
        },
        {
          path: '/app/profile',
          Component: Profile
        }
      ]
    },
    //#endregion App
    //#region Not Found
    {
      path: '*',
      Component: NotFound
    }
  ],
  routesConfig
)

export default routes
