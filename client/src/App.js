import './App.css';
import {Routes, Route, Link, Navigate, useNavigate, useLocation} from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import Home from './components/Home';
import New from './components/New';
import Login from './components/Login';

function App() {

  const location = useLocation()
  const navigate = useNavigate()

  const logout = () => {
    axios.post('http://localhost:8001/api/users/logout', {}, {withCredentials: true})
      .then(res => {
        console.log(res)
        navigate('/login')
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    location.pathname === '/login' || document.cookie === '' ? <Login /> : 
    
    <div>
      {console.log(Cookies.get('usertoken'))}
      <div className="d-flex justify-content-between align-items-center my-3 mx-4">
        <Link to="/home" className='text-decoration-none text-white'><h1>EchoEra</h1></Link>
        <div className="d-flex justify-content-center align-items-center">
          <Link to="/playlists/new" className='text-decoration-none'><h5 className="m-2 text-white">New</h5></Link>
          <Link to="/home" className='text-decoration-none'><h5 className="m-2 text-white">Home</h5></Link>
          <Link to="%" className='text-decoration-none'><h5 className="m-2 text-white">Profile</h5></Link>
          <h5 onClick={logout} className="m-2 text-white">Logout</h5>
        </div>
      </div>

      <Routes>
        {/* MAIN REDIRECT */}
        <Route path="/" element={<Navigate to='/login' />} />

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* HOME */}
        <Route path="/home" element={<Home />} />

        {/* CREATION */}
        <Route path="/playlists/new" element={<New />} />

      </Routes>
    </div>
  );
}

export default App;
