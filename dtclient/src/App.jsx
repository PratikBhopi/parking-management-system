import { useState } from 'react'

import './App.css'
import Home from "./components/Home"
import Parking from './components/Parking'
import Admin from './components/Admin';


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import BookForm from './components/BookForm';
import Del from './components/Del';
const router = createBrowserRouter([
  {
    path:'/book',
    element:<Parking />
  },
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/admin',
    element:<Admin/>
  },
  {
    path:'/delete',
    element:<Del/>
  }

])

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
           <RouterProvider router={router} />

    </>
  )
}

export default App
