import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectRoute = () => {
    const isLoggedIn=useSelector(state=>state.auth.isLoggedIn)
    if (!isLoggedIn){
        return <Navigate to='/' />
    }
    return <Outlet />
}

export default ProtectRoute