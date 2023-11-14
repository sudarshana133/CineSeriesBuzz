import React, { useContext, useEffect, useState } from "react";
import { fetchFromAPI } from "./utils/Fetch";
import CategoryContext from "../context/categoryContext/CategoryContext";
import ReactPlayer from "react-player";
import {ImCross} from 'react-icons/im'
import {Loader} from "."

const Trailer = ({ id,setYes }) => {
  const [trailer, setTrailer] = useState([]);
  const [IsLoading,setIsLoading] = useState(true);
  const CategoryVar = useContext(CategoryContext);
  useEffect(() => {
    setIsLoading(true);
    fetchFromAPI(
      `/${CategoryVar.category}/${id}?api_key=6c904288eb98b42018be7a4d587e93b0&append_to_response=videos`
    )
      .then((data) => {
        // console.log(data)
        if (data && data.videos && data.videos.results) setTrailer(data?.videos?.results);
        else setTrailer([])
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id]);
  // console.log(trailer);
  const handleCrossClick = ()=>{
    setYes(false);
  }
  return (
    <div className="flex items-center justify-center w-full h-[100vh] flex-col relative" onClick={()=>setYes(false)}>
      <div className="absolute right-[20px] lg:top-[20px] md:top-[10px] max-[640px]:top-0 text-2xl cursor-pointer" onClick={handleCrossClick}>
        <ImCross/>
      </div>
      <div className="flex justify-center items-center lg:w-full md:w-[500px] max-[640px]:w-[350px]">
        {
            IsLoading ? (
              <Loader/>
            ):trailer.length===0 ? (
              <h1 className="text-3xl font-bold">No Trailer</h1>
            ) : (
              <>
                {trailer.length !== 0 && (
                  <>
                    {trailer.find((video) => video.type === "Trailer" || video.type==="Teaser") && (
                      <>
                        <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${trailer.find((video) => video.type === "Trailer" || video.type=="Teaser").key}`}
                        controls
                        />
                      </>
                    )}
                  </>
                )}
              </>
            )
        }
      </div>
    </div>
  );
};

export default Trailer;
