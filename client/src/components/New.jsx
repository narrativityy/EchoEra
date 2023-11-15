import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const New = (props) => {

  const navigate = useNavigate()

  const [errors, setErrors] = useState([])
  
  const [songs, setSongs] = useState([])
  const [songName, setSongName] = useState('')
  const [artist, setArtist] = useState('')

  const addSong = async(e) => {
    e.preventDefault()

    if (songs.length !== 10) {
      axios.get(`http://localhost:8001/api/playlists/search/${songName}%20by%20${artist}`)
        .then(res => {
          setSongs([...songs, {name: songName, artist, youtubeID: `${res.data.items[0].id.videoId}`}])
          setSongName('')
          setArtist('')
        })
        .catch(err => {
          console.log(err)
        })
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
          return <p className='text-danger' key={i}>{elem}</p>
        })}
        <form onSubmit={addSong}>
          <table>
            <tbody>
              <tr>
                <td><label htmlFor="songName">Song Name: </label></td>
                <td className='p-1 px-2'><input onChange={(e) => setSongName(e.target.value)} type="text" name="songName" id="songName" value={songName} /></td>
              </tr>
              <tr>
                <td><label htmlFor="artist">Artist: </label></td>
                <td className='p-1'><input onChange={(e) => setArtist(e.target.value)} type="text" name="artist" id="artist" value={artist} /></td>
              </tr>
            </tbody>
          </table>
          <button>Add Song</button>
        </form>
        <p>Songs:</p>
        {songs.map((elem, i) => {
          return (
          <div className='d-flex justify-content-center align-items-center' key={i}>
            <a href={`https://www.youtube.com/watch?v=${elem.youtubeID}`} target="_blank" rel="noopener noreferrer"><p key={i} className='mx-3'>{elem.name} by {elem.artist}</p></a>
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

/* 
1. Yosemite by Travis Scott

2. Range Brothers by Baby Keem

3. In A Mintue by Lil Baby

4. Something in the Orange by Zach Bryan

5. Burn, Burn, Burn by Zach Bryan

6. First Person Shooter by Drake

7. Slime You Out by Drake

8. Overdue by Metro Boomin

9. Low Life by Future

10. Feel No Ways by Drake
*/