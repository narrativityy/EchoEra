import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Song = () => {

  const {id, index} = useParams()

  const [song, setSong] = useState(null)

  useEffect(() => {
    axios.get(`http://localhost:8001/api/playlists/${id}`)
      .then(res => {
        setSong(res.data.songs[index])
      })
      .catch(err => {
        console.log(err)
      })
  }, [id, index])

  return (
    song ? 
    <div className='text-center'>
      <div>
        {console.log(song)}
        <h3>{song.name} by {song.artist}</h3>
        <iframe className='mt-3' title='YouTube Video' style={{width: '60%', aspectRatio: '16 / 9'}} src={`https://www.youtube.com/embed/${song.youtubeID}`}></iframe>
      </div>
    </div> :
    <div className='d-flex justify-content-center align-items-center text-center'>
      <h3>Loading...</h3>
    </div>
  )
}

export default Song