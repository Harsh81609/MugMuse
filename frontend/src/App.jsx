import React from 'react'
import { RouterProvider } from 'react-router-dom'
import  {Bounce,ToastContainer} from 'react-toastify'
import { routes } from './routerConfig'

export default function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer 
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
        transition={Bounce}
      />
    </>
  )
}
