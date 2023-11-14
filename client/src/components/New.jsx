import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const New = (props) => {

  const navigate = useNavigate()

  const [errors, setErrors] = useState([])
  
  const [songs, setSongs] = useState([])
  const [songName, setSongName] = useState('')

  const addSong = (e) => {
    e.preventDefault()

    if (songs.length !== 10) {
      setSongs([...songs, songName])
      setSongName('')
    }
    else {
      setErrors(["You cannot add more than 10 songs"])
    }
  }

  const remove = (e) => {
    e.preventDefault()
    
    const splicedSongs = [...songs]
    splicedSongs.splice(e.target[0].value, 1)
    setSongs(splicedSongs)
  }

  const submitHandler = (e) => {
    e.preventDefault()

    if (songs.length === 10) {
      console.log(props.user)
      axios.post('http://localhost:8001/api/playlists', {user: props.user, songs})
      .then(res => {
        console.log(res)
        navigate('/home')
      })
      .catch(err => {
        console.log(err)
        setErrors(err)
      })
    }
    else {
      setErrors(['You must have 10 songs'])
    }
  }

  return (
    <div className='d-flex justify-content-center align-items-center text-center'>
      <div>
        {errors.map((elem, i) => {
          return <p className='text-warning' key={i}>{elem}</p>
        })}
        <form onSubmit={addSong}>
          <label htmlFor="songName">Song Name: </label>
          <input onChange={(e) => setSongName(e.target.value)} type="text" name="songName" id="songName" value={songName} />
          <button>Add Song</button>
        </form>
        <p>Songs:</p>
        {songs.map((elem, i) => {
          return (
          <div className='d-flex justify-content-center align-items-center'>
            <p key={i} className='mx-3'>{elem}</p>
            <form onSubmit={remove}>
              <button value={i}>Remove</button>
            </form>
          </div>)
        })}
        <form onSubmit={submitHandler}>
          <button>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default New