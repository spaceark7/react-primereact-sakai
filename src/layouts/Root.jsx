import React from 'react'
import { LayoutProvider } from '../context/LayoutProvider'
import 'primeicons/primeicons.css'
import 'primereact/resources/primereact.css'
import 'primeflex/primeflex.css'
import '@/styles/layout/layout.scss'
import '@/styles/demo/Demos.scss'
import ToastProvider from '../context/ToastProvider'
import GlobalToast from '@/components/GlobalToast'

const Root = ({ children }) => {
  return (
    <ToastProvider>
      <LayoutProvider>
        <GlobalToast />
        {children}
      </LayoutProvider>
    </ToastProvider>
  )
}

export default Root
