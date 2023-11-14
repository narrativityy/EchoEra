import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()

  const [errors, setErrors] = useState([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = (e) => {
    e.preventDefault()

    axios.post('http://localhost:8001/api/users/login', {email, password}, {withCredentials: true})
      .then(res => {
        console.log(res)
        navigate('/home')
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className='d-flex justify-content-center align-items-center text-center my-3 mx-4'>
      <div>
        <h1>EchoEra</h1>
        <form onSubmit={login}>
          <div>
            <label htmlFor="email">Email: </label>
            <input onChange={(e) => setEmail(e.target.value)} type="text" name="email" id="email" value={email} />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input onChange={(e) => setPassword(e.target.value)} type="text" name="password" id="password" value={password} />
          </div>
          <button>Login</button>
        </form>
        {errors.map((elem, i) => {
          return <p key={i}>{elem}</p>
        })}
      </div>
    </div>
  )
}

export default Login