import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {

  const navigate = useNavigate()

  const [errors, setErrors] = useState([])

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const register = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setErrors(['Passwords do not match'])
      return
    }

    axios.post('http://localhost:8001/api/users/register', {username, email, password}, {withCredentials: true})
      .then(res => {
        console.log(res)
        navigate('/home')
      })
      .catch(err => {
        err.response.data.errors.username ? setErrors([...errors, err.response.data.errors.username.message]) : setErrors([...errors])
        err.response.data.errors.email ? setErrors([...errors, err.response.data.errors.email.message]) : setErrors([...errors])
        err.response.data.errors.password ? setErrors([...errors, err.response.data.errors.password.message]) : setErrors([...errors])
      })
  
  }

  return (
    <div className='d-flex justify-content-center align-items-center text-center my-3 mx-4'>
      <div>
        <h1>EchoEra</h1>
        <form onSubmit={register} className='my-4'>
          <table>
            <tbody className='text-end'>
              <tr>
                <td><label htmlFor="username">Username: </label></td>
                <td className='p-1 px-2'><input onChange={(e) => setUsername(e.target.value)} type="text" name="username" id="username" value={username} /></td>
              </tr>
              {}
              <tr>
                <td><label htmlFor="email">Email: </label></td>
                <td className='p-1 px-2'><input onChange={(e) => setEmail(e.target.value)} type="text" name="email" id="email" value={email} /></td>
              </tr>
              <tr>
                <td><label htmlFor="password">Password: </label></td>
                <td className='p-1 px-2'><input onChange={(e) => setPassword(e.target.value)} type="text" name="password" id="password" value={password} /></td>
              </tr>
              <tr>
                <td><label htmlFor="confirmPassword">Confirm Password: </label></td>
                <td className='p-1 px-2'><input onChange={(e) => setConfirmPassword(e.target.value)} type="text" name="confirmPassword" id="confirmPassword" value={confirmPassword} /></td>
              </tr>
            </tbody>
          </table>
          <button className='btn btn-outline-light mt-3'>Register</button>
        </form>
        {errors.map((elem, i) => {
          return <p className='text-danger' key={i}>{elem}</p>
        })}
        <hr />
        <h5>Already have an account?</h5>
        <button onClick={() => navigate('/login')} className='btn btn-outline-light my-3'>Login</button>
      </div>
    </div>
  )
}

export default Register