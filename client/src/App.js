import './App.css';
import {Routes, Route, Link, Navigate} from 'react-router-dom'
import Home from './components/Home';

function App() {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center my-2 mx-3">
        <h1>EchoEra</h1>
        <div className="d-flex justify-content-center align-items-center">
          <Link to="%" className='text-decoration-none'><h5 className="m-2 text-white">Home</h5></Link>
          <Link to="%" className='text-decoration-none'><h5 className="m-2 text-white">Profile</h5></Link>
          <Link to="%" className='text-decoration-none'><h5 className="m-2 text-white">Logout</h5></Link>
        </div>
      </div>

      <Routes>
        {/* MAIN REDIRECT */}
        <Route path="/" element={<Navigate to='/home' />} />

        {/* HOME */}
        <Route path="home" element={<Home />} />

      </Routes>
    </div>
  );
}

export default App;
