import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Carousel, Skeleton, Trailer } from ".";
import { fetchFromAPI } from "./utils/Fetch";
import { GrCircleInformation } from "react-icons/gr";
import CategoryContext from "../context/categoryContext/CategoryContext";

const CastProfile = () => {
  const { castName } = useParams();
  const { castId } = useParams();
  const [castDetail, setCastDetail] = useState([]);
  const [id, setId] = useState("");
  const [yes, setYes] = useState(false);
  const [IsLoading, setIsLoading] = useState(true);
  const [castBio, setCastBio] = useState([]);
  const [castMovies, setCastMovies] = useState([]);
  const [castTVShows, setCastTVShows] = useState([]);
  const { category } = useContext(CategoryContext);
  // finding the cast's movies
  useEffect(() => {
    setIsLoading(true);
    fetchFromAPI(`/search/person?query=${castName}`)
      .then((data) => {
        setCastDetail(data.results);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [castName]);

  useEffect(() => {
    setIsLoading(true);
    fetchFromAPI(`/person/${castId}`)
      .then((data) => {
        setCastBio(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [castId]);

  useEffect(() => {
    setIsLoading(true);
    fetchFromAPI(`/person/${castId}/movie_credits`)
      .then((data) => {
        setCastMovies(data.cast);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    setIsLoading(true);
    fetchFromAPI(`/person/${castId}/tv_credits`)
      .then((data) => {
        setCastTVShows(data.cast);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  // console.log(castBio)
  let foundDetail;
  if (castDetail !== null) {
    foundDetail = castDetail.find((detail) => detail.id === parseInt(castId));
    // console.log(foundDetail?.known_for)
    if (foundDetail?.known_for) foundDetail.known_for.slice(0, 3);
  }
  if (IsLoading) {
    return (
      <>
        <div>
          <Skeleton castProfileSkeleton={true} />
          <div className="my-10 ml-[400px]">
            <Skeleton number={3} />
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      {yes && (
        <div className="modal">
          <Trailer id={id} setYes={setYes} />
        </div>
      )}
      <div className="flex flex-col justify-start items-center w-full h-[100vh]">
        <div className="heading text-xl mb-[25px]">
          <span className=" text-blue-500">{castName}</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center">
            <div className="rounded-md overflow-hidden border-[1px] border-solid border-gray-400">
              <img
                src={`https://image.tmdb.org/t/p/w500/${foundDetail?.profile_path}`}
                alt=""
                width={150}
              />
            </div>
            <div className="text-center mt-4 flex flex-col items-center">
              <h1 className="w-[200px]">
                Popularity{" "}
                <span className="text-blue-400 font-extrabold">
                  {foundDetail?.popularity}
                </span>
              </h1>
              <h1 className="w-[250px]">
                Know For{" "}
                <span className="text-blue-400 font-extrabold">
                  {foundDetail?.known_for_department}
                </span>
              </h1>
              {castBio.biography !== null && (
                <div className="biography text-justify text-[16px] flex items-center flex-col my-6">
                  <h1 className="text-xl text-blue-400">Biography</h1>
                  <p className="mt-2 w-[90vw] flex lg:text-lg md:text-base sm:text-base">
                    {castBio?.biography}
                  </p>
                </div>
              )}
            </div>
          </div>
          {castMovies.length > 0 ? (
            <div className="mt-4">
              <div className="flex flex-col items-center mb-[30px]">
                <div className="heading text-[17.5px] sm:text-base md:text-lg lg:text-xl">
                  Movies of <span className=" text-blue-500">{castName}</span>
                </div>
                <div className="w-[90vw]">
                  <Carousel
                    list={castMovies}
                    videos={null}
                    cast={null}
                    isCast={true}
                    tvOrMovie={'movie'}
                  />
                </div>
              </div>
            </div>
          ) : (
            <h1 className="text-2xl">No Movies Found</h1>
          )}

          <div className="mb-[20px]">
            {castTVShows.length > 0 ? (
              <div>
                <div className="flex flex-col items-center mb-[30px]">
                  <div className="heading text-[17.5px] sm:text-base md:text-lg lg:text-xl">
                    TV Shows of{" "}
                    <span className=" text-blue-500">{castName}</span>
                  </div>
                  <div className="w-[90vw]">
                    <Carousel
                      list={castTVShows}
                      videos={null}
                      cast={null}
                      isCast={true}
                      tvOrMovie={'tv'}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <h1 className="text-2xl">No TV Shows found</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CastProfile;
