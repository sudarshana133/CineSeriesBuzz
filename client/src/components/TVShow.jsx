import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { fetchFromAPI } from './utils/Fetch';
import {Genre, Collection,Videos,Cast,Skeleton} from "./";
import {AiFillPlusCircle} from "react-icons/ai"

const TVShow = () => {
  const {TVShowId} = useParams();
  const [TVShowDetail,SetTVShowDetail] = useState({});
  const [IsLoading,setIsLoading] = useState(true);
  const [isCollectionInvoked,setIsCollectionInvoked] = useState(false);

  useEffect(()=>{
    setIsLoading(true);
    fetchFromAPI(`/tv/${TVShowId}?api_key=6c904288eb98b42018be7a4d587e93b0&append_to_response=credits,videos`)
    .then((data)=>{
      SetTVShowDetail(data)
      setIsLoading(false);
    })
    .catch((err)=>console.log(err))
  },[TVShowId])
  // console.log(TVShowDetail);

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours} h ${minutes > 0 ? ` ${minutes} min ` : ""}`;
  };
  const Year = (completeDate)=>{
    const year = completeDate ? completeDate.substr(0,4) : ""
    return year;
  }
  if(IsLoading)
  {
    return (
      <div className='mt-2'>
        <div><Skeleton confirmHomePage="true"/></div>
        <div className='mt-[30px] ml-[110px]'><Skeleton number={4}/></div>
        <div className='mt-[30px] ml-[110px]'><Skeleton number={4}/></div>
      </div>
    )
  } 
  return (
    <>
      {
          isCollectionInvoked &&(
            <div className='modal'>
              <Collection setIsCollectionInvoked={setIsCollectionInvoked} movieOrTVShowId={`tv/${TVShowId}`} movieOrTV={'tv'}/>
            </div>
          )
      }
      <div className='relative text-justify'>
        <div className="absolute top-0 left-0 w-[100%] h-[100%] invisible md:visible lg:visible" style={{boxShadow:"500px 0 1900px rgba(0,0,0,0.95) inset"}}></div>
        <div className='flex w-full p-2 h-[250px] sm:h-[300px] md:h-[500px] lg:h-[620px] flex-col' style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/w1280/${TVShowDetail.backdrop_path}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "top left",
        }}>
          <div className='hidden lg:z-10 md:z-10 lg:flex md:flex lg:flex-col md:flex-col lg:ml-5 md:ml-5 md:translate-y-[10px] lg:translate-y-[20px]'>
            <div className="name">
              <h1 className='font-[1000] w-[500px] md:text-xl lg:text-3xl xl:text-4xl'>{TVShowDetail.name}</h1>
            </div>
            <div>
              <p className='md:w-[520px] lg:w-[600px] text-justify mt-5 md:text-[16px] md:leading-6 lg:text-lg'>{TVShowDetail?.overview}</p>
            </div>
            <div className='MovieDetails flex mt-6 text-xl text-[#999999] font-bold'>
              <div className='mr-2'>
                <p>Rating {TVShowDetail?.vote_average}</p>
              </div>
              <div className='ml-2'>
                {Year(TVShowDetail?.release_date)}
              </div>
            </div>
            <div className="flex items-center">
              <div className="genre mt-4">
                <Genre genreIds={TVShowDetail?.genres}/>
              </div>
              <div className="collection mt-4 ml-2 text-[27px] hover:scale-150 duration-75 cursor-pointer" 
              onClick={()=>setIsCollectionInvoked(true)}
              >
                <AiFillPlusCircle/>
              </div>
            </div>
          </div>
        </div>
        </div>
        {/* only for the sake of responsivesness */}
        <div className='flex flex-col mx-5 visible md:hidden lg:hidden xl:hidden'>
            <div className="name">
              <h1 className='text-[25px] font-medium mt-4'>{TVShowDetail?.name}</h1>
            </div>
            <div>
              <p className='w-full text-justify mt-2 text-[15px] font-extrathin'>{TVShowDetail?.overview}</p>
            </div>
            <div className='MovieDetails flex mt-6 text-[15px] text-[#999999] font-bold'>
              <div className='mr-2'>
                <p>Rating {TVShowDetail?.vote_average}</p>
              </div>
              <div className='ml-2'>
                {Year(TVShowDetail?.release_date)}
              </div>
            </div>
            <div className="flex items-center">
              <div className="genre mt-4">
                <Genre genreIds={TVShowDetail?.genres}/>
              </div>
              <div className="collection mt-4 ml-2 text-[27px] hover:scale-150 duration-75 cursor-pointer" >
                <AiFillPlusCircle onClick={()=>setIsCollectionInvoked(true)}/>
              </div>
            </div>
          </div>
        {/* trailer */}
        <div>
          <Videos videosDetails={TVShowDetail.videos?.results}/>
        </div>
        <div>
              <Cast castDetails={TVShowDetail?.credits}/>
        </div>
    </>
  )
}

export default TVShow;
