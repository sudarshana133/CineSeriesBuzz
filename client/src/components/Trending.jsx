import React from 'react';
import Carousel from './Carousel';

const TrendingMovies = ({trending,tvOrMovie}) => {
  return (
    <>
      <Carousel list={trending} tvOrMovie={tvOrMovie} videos={null} cast={null}/>
    </>
  )
}

export default TrendingMovies
