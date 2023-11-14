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
        setErrors(['Invalid Credentials please try again'])
      })
  }

  return (
    <div className='d-flex justify-content-center align-items-center text-center my-3 mx-4'>
      <div>
        <h1>EchoEra</h1>
        <form onSubmit={login} className='my-4'>
          <table>
            <tbody className='text-end'>
              <tr>
                <td><label htmlFor="email">Email: </label></td>
                <td className='p-1 px-2'><input onChange={(e) => setEmail(e.target.value)} type="text" name="email" id="email" value={email} /></td>
              </tr>
              <tr>
                <td><label htmlFor="password">Password: </label></td>
                <td className='p-1 px-2'><input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" value={password} /></td>
              </tr>
            </tbody>
          </table>
          <button className='btn btn-outline-light mt-3'>Login</button>
        </form>
        {errors.map((elem, i) => {
          return <p className='text-danger' key={i}>{elem}</p>
        })}
        <hr />
        <h5>Need an account?</h5>
        <button onClick={() => navigate('/register')} className='btn btn-outline-light my-3'>Register</button>
      </div>
    </div>
  )
}

export default Login