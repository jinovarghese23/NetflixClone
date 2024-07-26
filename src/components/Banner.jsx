import React, { useEffect, useState } from 'react'
import instance from '../instance';
import './Banner.css'

function Banner({ fetchUrl }) {
  console.log("Banner fetch", fetchUrl);
  const [movie, setMovie] = useState({})
  const image_base_url = "https://image.tmdb.org/t/p/original"
  const fetchData = async () => {
    const result = await instance.get(fetchUrl)
    const { data } = result
    console.log(data);
    console.log("===Total length",data.results.length);
    console.log(data.results[Math.floor(Math.random()*data.results.length)]);
    setMovie(data.results[Math.floor(Math.random()*data.results.length)])

  }
  useEffect(() => {
    setInterval(() => {
      fetchData()
    },5000)
  }, [])
  console.log("====Movie Details=====");
  console.log(movie);
  return (
    <div style={{height: '600px',width:'100%', backgroundImage: `url(${image_base_url}${movie?.backdrop_path})`,backgroundSize:'cover' }}>
      <div className='banner_content'>
        <h2>{movie?.name}</h2>
        <button className='btn btn-danger me-3'>Play <i class="ms-2 fa-solid fa-play"></i></button>
        <button className='btn btn-outline-light'>More info<i class="ms-2 fa-solid fa-caret-down"></i></button>
        <h3 style={{color:'black'}}>{movie?.overview?.slice(0-200)}...</h3>
      </div>
    </div>
  )
}

export default Banner;