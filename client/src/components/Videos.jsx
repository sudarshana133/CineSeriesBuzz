import React, { useState } from "react";
import {Carousel} from "./";

const Videos = ({videosDetails}) => {
    // console.log(videosDetails);
    if(!videosDetails){
        return null;
    }
    const videos = Object.values(videosDetails);
    // console.log(videos);
    return (
     videos.length!==0 ? 
        (<div className='mt-4 h-full flex flex-col mb-10 justify-center items-center'>
            <div>
                <h1 className="text-3xl mt-3 ml-2">Clips and Trailers</h1>
            </div>
            <div className="">
                <Carousel videos={videos} list={null} tvOrMovie={null} cast={null}/>
            </div>
        </div>
    ):(
        <div className="mt-5"></div>
    )
    )
}

export default Videos
