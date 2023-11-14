import React, { useContext, useEffect, useState } from 'react'
import { fetchFromAPI } from './utils/Fetch';
import CategoryContext from '../context/categoryContext/CategoryContext';
import { Carousel } from './';

const TopRated = ({tvOrMovie}) => {
  const [topRated,setTopRated] = useState([]);
  var CategoryVar = useContext(CategoryContext);
  useEffect(()=>{
    fetchFromAPI(`discover/${CategoryVar.category}?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200`)
    .then((data)=>{
      setTopRated(data.results)
    })
    .catch((err)=>console.log(err))
  },[CategoryVar.category])
  return (
      <div className='mb-[20px]'>
        <Carousel list={topRated} tvOrMovie={tvOrMovie} videos={null} cast={null}/>
      </div>
  )
}

export default TopRated
