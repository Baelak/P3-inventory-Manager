import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Inventory from './pages/Inventory.jsx'
import InventoryItemCard from './components/InventoryItemCard.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <Dashboard />
      }, {
        path: '/login',
        element: <Login />
      } , {
        path: '/signup',
        element: <Signup />
      } , {
        path: '/inventory',
        element: <Inventory />
      } , {
        path: '/inventoryitemcard',
        element: <InventoryItemCard />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
