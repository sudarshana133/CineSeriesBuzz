import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Carousel, Skeleton ,Trailer} from ".";
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
  const {category} = useContext(CategoryContext);
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
          <div className="">
            <div className="flex flex-col items-center mb-[30px]">
              <div className="heading mb-[25px] ">
                Movies or TV Shows of{" "}
                <span className=" text-blue-500">{castName}</span>
              </div>
              {foundDetail &&
                foundDetail.known_for &&
                foundDetail.known_for.length !== 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3">
                    {foundDetail?.known_for.map((item,index) => (
                      <React.Fragment key={index}>
                        <div className="main mx-1 my-4 relative">
                          <div className="img overflow-hidden w-[160px] sm:w-[170px] md:w-[210px] lg:w-[200px] ">
                            <img
                              src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                              alt="poster"
                              className="border-[1px] border-solid border-gray-400 rounded-md"
                            />
                          </div>
                          <div className="title">
                            <h1 className="text-center mt-4 text-[14px] sm:text-[14.5px] md:text-[19px] lg:text-[17px] lg:font-semibold w-[180px] sm:w-[170px] md:w-[210px] lg:w-[200px] ">{item?.name || item?.title}</h1>
                          </div>
                          {/* details */}
                          <div className="details px-2 flex flex-col items-center absolute w-[180px] sm:w-[170px] md:w-[210px] lg:w-[200px]   top-[35px] sm:top-[70px] md:top-[125px] lg:top-[145px]">
                            <div className="play flex flex-col mt-[13px] mb-2">
                              <div>
                                <p className="text-[14px] h-[130px] sm:h-[100px] md:text-[17px] lg:text-[15px] ml-2 mb-3">
                                  {item?.overview?.substr(0, 70)}...
                                </p>
                              </div>
                              <div className="flex justify-center mb-2">
                                <p
                                  onClick={() => {
                                    setYes(true);
                                    setId(item.id);
                                  }}
                                  className="btn flex justify-center items-center bg-white text-black w-[50px] rounded-md text-sm h-[25px] cursor-pointer"
                                >
                                  Play
                                </p>
                                <a
                                  href={`/${category}/${item.id}`}
                                  className="btn flex ml-2 items-center justify-center bg-white text-black w-[58px] rounded-md text-sm h-[25px]"
                                >
                                  More <GrCircleInformation className="ml-1" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CastProfile;
