import React from 'react'
import {Carousel, Skeleton} from './';

const Cast = ({castDetails}) => {
    if(!castDetails){
        return (<div className='ml-[120px] mt-[30px]'>
        <Skeleton number={5}/>
        </div>)
    }
    const credits = Object.values(castDetails);
    // console.log(credits);
    return (
    <div className='flex flex-col text-center'>
        <div className='lg:text-2xl text-center text-[19px] sm:text-[14.5px] md:text-[19px] mx-auto font-bold'><h1>Cast</h1></div>
        <div>
            <Carousel cast={credits[0]} videos={null} list={null} tvOrMovie={null}/>
        <div className='lg:text-2xl text-center text-[19px] sm:text-[14.5px] md:text-[19px] mx-auto font-bold'><h1>Crew</h1></div>
            <Carousel cast = {credits[1]} videos={null} list={null} tvOrMovie={null}/>
        </div>
    </div>
    )
}

export default Cast
