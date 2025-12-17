import { useSelector } from 'react-redux'
import Navbar from '../Componenets/Navbar'

const Home = () => {
  const user=useSelector(state=>state.auth.user)

  return (
    <div>
      <Navbar />
      <h2>Home</h2>
      <p>welcome {user?user.email:'Guest'}</p>    
    </div>
  )
}

export default Home
