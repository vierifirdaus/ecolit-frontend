import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './route'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast';
import { IntlProvider } from "react-intl"

const queryClient = new QueryClient

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <QueryClientProvider client={queryClient}>
      <IntlProvider locale="id">
        <RouterProvider router={router}/>
      </IntlProvider>
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>,
)
