import Home from './Pages/Home'
import Login from './Pages/Login'
import { Route, Routes } from 'react-router-dom'
import Register from './Pages/Register'
import ProtectRoute from './Componenets/ProtectRoute'

const App = () => {

  return (
    <>
    <Routes>
      <Route path='/' element={<Login />}  />
      <Route path='/register' element={<Register />}  />
      <Route element={<ProtectRoute />} >
        <Route path='home' element={<Home />} />
        {/* <Route path='home' element={<Home />} /> */}
      </Route>
      </Routes>    
    </>
  )
}

export default App