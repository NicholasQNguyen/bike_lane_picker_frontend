import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './index.css'
import App from './App.tsx'
import ViewPoints from "./viewPoints/ViewPoints.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>
  },
  {
    path: '/view-points',
    element: <ViewPoints/>
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
