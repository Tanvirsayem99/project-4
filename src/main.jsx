import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './routes/routes.jsx';
import AuthProvider from './Provider/AuthProvider';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
    <div className='md:w-11/12 mx-auto'>
    <RouterProvider router={router} />
    </div>
    </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
