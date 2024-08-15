import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import store from "./store.js"
import { Provider } from 'react-redux'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css"
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen.jsx'
import Login from './screens/Login.jsx'
import Register from './screens/Register.jsx'
import Profile from './screens/Profile.jsx'

import PrivateRoutes from './components/PrivateRoutes.jsx'
const router =createBrowserRouter([
  {path:"/",
    element:<App/>,
    children:[
      {
        
        index :true,
        // path:"/",
        element:<HomeScreen/>
      },
      {
        path:"login" ,
        
        element:<Login/>
      },
      {
        path:"register" ,
        
        element:<Register/>
      },
      {
        path:"profile" ,
        
        element:<PrivateRoutes/>,
        children:[
          {
          path:"",
            element:<Profile/>
          }
        ]
      }
    ]
  }
]
  
  
)
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
<StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
  </Provider>
)
