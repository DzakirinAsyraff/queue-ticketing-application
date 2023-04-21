import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Customer from './Customer';
import Management from './Management';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/customer",
    element: <Customer/>,
  },
  {
    path: "/management",
    element: <Management/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
