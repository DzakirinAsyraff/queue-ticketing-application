import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App'
import Customer from './Customer';
import Management from './Management';
import {
  createBrowserRouter,
  RouterProvider,
  createHashRouter
} from "react-router-dom";
import './styles/index.css'

const router = createHashRouter([
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
    {/* redux store */}
    <Provider store={store}>
    {/* router provider */}
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
