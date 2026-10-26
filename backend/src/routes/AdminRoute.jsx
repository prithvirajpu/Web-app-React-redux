import { useSelector } from "react-redux";
import { Navigate,Outlet } from "react-router-dom";


const AdminRoute = () => {
    const {user,isLoggedIn}=useSelector((state)=>state.auth);
    if (!isLoggedIn){
        return <Navigate to='/' replace/>
    }
    if (!user || !user.is_staff){
        return <Navigate to='/home' replace/>
    }
    return <Outlet />
}

export default AdminRoute
