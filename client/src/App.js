import './App.css';
import {Routes, Route, Link, Navigate} from 'react-router-dom'
import Home from './components/Home';
import New from './components/New';

function App() {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center my-3 mx-4">
        <Link to="/home" className='text-decoration-none text-white'><h1>EchoEra</h1></Link>
        <div className="d-flex justify-content-center align-items-center">
          <Link to="/playlists/new" className='text-decoration-none'><h5 className="m-2 text-white">New</h5></Link>
          <Link to="/home" className='text-decoration-none'><h5 className="m-2 text-white">Home</h5></Link>
          <Link to="%" className='text-decoration-none'><h5 className="m-2 text-white">Profile</h5></Link>
          <Link to="%" className='text-decoration-none'><h5 className="m-2 text-white">Logout</h5></Link>
        </div>
      </div>

      <Routes>
        {/* MAIN REDIRECT */}
        <Route path="/" element={<Navigate to='/home' />} />

        {/* HOME */}
        <Route path="/home" element={<Home />} />

        {/* CREATION */}
        <Route path="/playlists/new" element={<New />} />

      </Routes>
    </div>
  );
}

export default App;
