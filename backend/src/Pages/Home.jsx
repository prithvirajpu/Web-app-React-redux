import { useSelector,useDispatch } from 'react-redux';
import Navbar from '../Componenets/Navbar';
import { fetchProfile } from '../features/auth/authThunks';
import { useEffect } from 'react';

const Home = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch=useDispatch();

  useEffect(()=>{
    const token=localStorage.getItem('access_token');
    if (token && !user){
      dispatch(fetchProfile());
    }

  },[dispatch,user])


  return (
    <div >
      <Navbar />
      <h1 style={{textAlign:'center'}}>Welcome {user ? user.username : 'Guest'}</h1>
    </div>
  );
};

export default Home;
