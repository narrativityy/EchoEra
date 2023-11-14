import {useState, useEffect} from 'react'
import {Routes, Route, Link, Navigate, useNavigate, useLocation} from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import Home from './components/Home';
import New from './components/New';
import Login from './components/Login';
import Register from './components/Register';

function App() {

  const location = useLocation()
  const navigate = useNavigate()

  const [id, setId] = useState('')
  const [user, setUser] = useState({})

  useEffect(() => {
    setId(Cookies.get('usertoken'))
    axios.get(`http://localhost:8001/api/users/jwt/${id}`)
      .then(res => {
        setUser(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [id])

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
    document.cookie === '' ? 
    <Routes>
      {/* LOGIN */}
      <Route path="/login" element={<Login />} />

      {/* REGISTER */}
      <Route path="/register" element={<Register />} />

      {/* MAIN REDIRECT */}
      <Route path="*" element={<Navigate to='/login' />} />
    </Routes> : 

    <div>
      <div className="d-flex justify-content-between align-items-center my-3 mx-4">
        <Link to="/home" className='text-decoration-none text-white'><h1>EchoEra</h1></Link>
        <div className="d-flex justify-content-center align-items-center">
          <Link to="/playlists/new" className='text-decoration-none'><h5 className="m-2 text-white">New</h5></Link>
          <Link to="/home" className='text-decoration-none'><h5 className="m-2 text-white">Home</h5></Link>
          <Link to="%" className='text-decoration-none'><h5 className="m-2 text-white">{user.username}</h5></Link>
          <button style={{background: 'none', border: 'none'}}><h5 onClick={logout} className="m-2 text-white">Logout</h5></button>
        </div>
      </div>

      <Routes>

        {/* HOME */}
        <Route path="/home" element={<Home user={user} />} />

        {/* CREATION */}
        <Route path="/playlists/new" element={<New user={user} />} />

        {/* MAIN REDIRECT */}
        <Route path="*" element={<Navigate to='/home' />} />

      </Routes>
    </div>
  );
}

export default App;
