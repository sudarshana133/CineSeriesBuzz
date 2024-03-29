import React, { useContext, useEffect, useState } from 'react'
import {fetchFromAPI} from "./utils/Fetch"
import {Carousel} from "."
import CategoryContext from '../context/categoryContext/CategoryContext';
const GenreData = ({tvOrMovie,genreId}) => {
    const [topRated,setTopRated] = useState([]);
    var CategoryVar = useContext(CategoryContext);
    useEffect(()=>{
        fetchFromAPI(`discover/${tvOrMovie}?with_genres=${genreId}&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200`)
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

export default GenreData
