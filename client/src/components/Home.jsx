import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Home = (props) => {

  const [user, setUser] = useState(props.user)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8001/api/playlists')
      .then(res => {
        console.log(res)
        setPosts(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className='d-flex justify-content-between align-items-center'>
      {/* POSTS */}
      <div className='d-flex justify-content-center align-items-center flex-wrap my-5 mx-5'>
        {posts.map((elem) => {
          return (
            <div className='border p-3 rounded text-center' key={elem._id}>
              {user.username === elem.user.username ? <h5 className='border-bottom pb-2 px-2'>My Top 10</h5> : <h5 className='border-bottom pb-2 px-2'>{elem.user.username}'s Top 10</h5>}
              <div className='pt-1'>
                {elem.songs.map((song, i) => {
                  return <p key={i}>{i + 1}. {song}</p>
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* FRIENDS LIST */}
      <div>
        
      </div>
    </div>
  )
}

export default Home