import { createBrowserRouter } from 'react-router'
// import Layout from '@/layouts/Layout'
import LandingPage from '@/pages/Landing'
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
const Login = React.lazy(() => import('@/pages/Login'))
//#endregion Login
//#region Layout
const Layout = React.lazy(() => import('@/layouts/Layout'))
//#endregion Layout
//#region Dashboard
const Dashboard = React.lazy(() => import('@/pages/app/Dashboard'))
//#endregion Dashboard
//#region UI Kits
const FormLayout = React.lazy(() => import('@/pages/app/ui-kits/FormLayout'))
//#endregion UI Kits
//#region Not Found
const NotFound = React.lazy(() => import('@/pages/NotFound'))
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
      loader: redirectMiddleware,
      
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
            }
          ]
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
