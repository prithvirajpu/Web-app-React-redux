import Home from './Pages/Home'
import Login from './Pages/Login'
import { Route, Routes } from 'react-router-dom'
import Register from './Pages/Register'
import ProtectRoute from './Componenets/ProtectRoute'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchProfile } from './features/auth/authThunks'
import Profile from './Pages/Profile'
import AdminRoute from './routes/AdminRoute'
import AdminHome from './Pages/AdminHome'
import AdminUsers from './Pages/AdminUser'

const App = () => {
  const dispatch=useDispatch()
  useEffect(()=>{
    const token=localStorage.getItem('accessToken');
    if (token){
      dispatch(fetchProfile());
    }
  },[dispatch])

  return (
    <>
    <Routes>
      <Route path='/' element={<Login />}  />
      <Route path='/register' element={<Register />}  />

      <Route element={<AdminRoute />}>
        <Route path='/admin' element={ <AdminHome />} />
        <Route path='/admin/users' element={<AdminUsers />} />
      </Route>

      <Route element={<ProtectRoute />} >
        <Route path='/home' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
      </Route>

      </Routes>    
    </>
  )
}

export default App