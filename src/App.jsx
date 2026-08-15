import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/navbar.jsx'
import Home from './components/home.jsx'
import Paste from './components/paste.jsx'
import Viewpaste from './components/viewpaste.jsx'

 const route=createBrowserRouter([
  {
    path:"/",
    element:
    <div>
      <Navbar />
      <Home />
    </div>
    
  },
  {
    path:"/paste",
    element:
    <div>
      <Navbar />
      <Paste />

     
    </div>

  },
  {
    path:"/paste/:id",
    element:
    <div>
      <Navbar />
      <Viewpaste />
    </div>

  },
  {
    path:"/paste",
    element:
    <div>
     
    </div>

  },
 ]);
function App() {
   const count = useSelector((state) => state.paste)
  const dispatch = useDispatch()
  return (
    <div className="app-shell">
      <RouterProvider router={route}/>
      </div>
  )
}

export default App
