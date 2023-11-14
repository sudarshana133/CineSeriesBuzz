import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { fetchFromAPI } from './utils/Fetch';
import { Cast, Collection, Genre, Skeleton, Videos} from "./"
import {AiFillPlusCircle} from "react-icons/ai"

const Movie = () => {
  const {MovieId} = useParams();
  const [MovieDetail,SetMovieDetail] = useState({});
  const [IsLoading,setIsLoading] = useState(true);
  const [isCollectionInvoked,setIsCollectionInvoked] = useState(false);
  useEffect(()=>{
    setIsLoading(true)
    fetchFromAPI(`/movie/${MovieId}?api_key=6c904288eb98b42018be7a4d587e93b0&append_to_response=credits,videos`)
    .then((data)=>{
      SetMovieDetail(data)
      setIsLoading(false)
    })
    .catch((err)=>console.log(err))
  },[MovieId])

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
            <Collection setIsCollectionInvoked={setIsCollectionInvoked} movieOrTVShowId={`movie/${MovieId}`} movieOrTV={'movie'}/>
          </div>
        )
    }
    <div className={`${isCollectionInvoked ? 'blurring':''}`}>
      <div className={`relative text-justify`}>
        <div className="absolute top-0 left-0 w-[100%] h-[100%] invisible md:visible lg:visible" style={{boxShadow:"360px 0 1900px rgba(0,0,0,0.75) inset"}}></div>
        <div className='flex w-full p-2 h-[250px] sm:h-[300px] md:h-[500px] lg:h-[620px] flex-col ' style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/w1280/${MovieDetail.backdrop_path}')`,
          backgroundSize:"cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}>
          <div className='hidden lg:z-10 md:z-10 lg:flex md:flex lg:flex-col md:flex-col lg:ml-5 md:ml-5 md:translate-y-[80px] lg:translate-y-[60px]'>
            <div className="name">
              <h1 className='font-[1000] w-[500px] md:text-xl lg:text-3xl xl:text-4xl'>{MovieDetail.title}</h1>
            </div>
            <div>
              <p className='md:w-[310px] lg:w-[400px] text-justify mt-5 md:text-[16px] md:leading-6 lg:text-lg'>{MovieDetail?.overview}</p>
            </div>
            <div className='MovieDetails flex mt-6 text-xl text-[#999999] font-bold'>
              <div className='mr-2'>
                <p>Rating {MovieDetail?.vote_average}</p>
              </div>
              <div className='mx-2'>
                {toHoursAndMinutes(MovieDetail?.runtime)}
              </div>
              <div className='ml-2'>
                {Year(MovieDetail?.release_date)}
              </div>
            </div>
            <div className="flex items-center">
              <div className="genre mt-4">
                <Genre genreIds={MovieDetail?.genres}/>
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
              <h1 className='text-[25px] font-medium mt-4'>{MovieDetail?.title}</h1>
            </div>
            <div>
              <p className='w-full text-justify mt-2 text-[15px] font-extrathin'>{MovieDetail?.overview}</p>
            </div>
            <div className='MovieDetails flex mt-6 text-[15px] text-[#999999] font-bold'>
              <div className='mr-2'>
                <p>Rating {MovieDetail?.vote_average}</p>
              </div>
              <div className='mx-2'>
                {toHoursAndMinutes(MovieDetail?.runtime)}
              </div>
              <div className='ml-2'>
                {Year(MovieDetail?.release_date)}
              </div>
            </div>
            <div className="flex items-center">
              <div className="genre mt-4">
                <Genre genreIds={MovieDetail?.genres}/>
              </div>
              <div className="collection mt-4 ml-2 text-[27px] hover:scale-150 duration-75 cursor-pointer" >
                <AiFillPlusCircle onClick={()=>setIsCollectionInvoked(true)}/>
              </div>
            </div>
          </div>
        {/* trailer */}
        <div>
          <Videos videosDetails={MovieDetail.videos?.results}/>
        </div>
        {/* Cast and crew */}
        <div>
              <Cast castDetails={MovieDetail?.credits}/>
        </div>
    </div>
    </>
  )
}

export default Movie
