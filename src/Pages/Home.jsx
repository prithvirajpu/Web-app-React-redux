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
    <div>
      <Navbar />
      <h2>Home</h2>
      <p>Welcome {user ? user.username : 'Guest'}</p>
    </div>
  );
};

export default Home;
