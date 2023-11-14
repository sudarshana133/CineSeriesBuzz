import React, { useRef, useState, useContext } from "react";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import ReactPlayer from "react-player";
import { Person, Skeleton, Trailer } from "./";
import CategoryContext from "../context/categoryContext/CategoryContext";
import { GrCircleInformation } from "react-icons/gr";

const Carousel = ({ list, tvOrMovie, videos, cast }) => {
  const carouselContainer = useRef();
  const [yes, setYes] = useState(false);
  const [IsLoading, setIsLoading] = useState(true);
  const [id, setId] = useState("");
  const [isMouseHovered, setIsMouseHovered] = useState(false);
  var CategoryVar = useContext(CategoryContext);
  // console.log(cast);
  const navigation = (direction) => {
    const container = carouselContainer.current;
    const scrollAmt =
      direction === "left"
        ? container.scrollLeft - (container.offsetWidth + 5)
        : container.scrollLeft + (container.offsetWidth + 5);

    container.scrollTo({
      left: scrollAmt,
      behavior: "smooth",
    });
  };

  return (
    <>
      {yes && (
        <div className="modal">
          <Trailer id={id} setYes={setYes} />
        </div>
      )}
      <div className={`relative ${yes ? "blurring" : ""}`}>
        <div
          className={`carousel flex overflow-x-scroll mt-2 justify-between ${videos?'ml-0':'ml-[30px]'}`}
          ref={carouselContainer}
          onMouseEnter={() => setIsMouseHovered(true)}
          onMouseLeave={() => setIsMouseHovered(false)}
        >
          <div className={`invisible lg:visible `}>
            <AiOutlineArrowLeft
              className={`text-5xl absolute top-[100px] left-0 ml-[45px] z-[100] cursor-pointer ${
                isMouseHovered ? "" : "hidden"
              }`}
              onClick={() => navigation("left")}
            />
          </div>
          {/* this is for the carousel of the movies or the web series */}
          <div className="flex">
            {list !== null &&
              list.map((item, index) => (
                <React.Fragment key={index}>
                  <div>
                    <div className="mx-[13px] mt-1 lg:mx-[25px] relative main overflow-y-hidden">
                      <div className="img w-[180px] sm:w-[170px] md:w-[210px] lg:w-[200px] ">
                        <img
                          src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                          alt="poster"
                          className="border-[1px] border-solid border-gray-400 rounded-md"
                        />
                      </div>
                      <div className="title">
                        <p className="text-center mt-4 text-[14px] sm:text-[14.5px] md:text-[19px] lg:text-[17px] lg:font-semibold">
                          {item?.title || item?.name}
                        </p>
                      </div>
                      <div className="details px-2 flex flex-col items-center absolute w-inherit sm:top-[70px] md:top-[125px] lg:top-[145px]">
                        <div className="play flex flex-col mt-[13px] mb-2">
                          <div>
                            <p className="text-[14px]  sm:h-[100px] md:text-[17px] lg:text-[15px] ml-2 mb-3">
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
                              href={`/${CategoryVar.category}/${item.id}`}
                              className="btn flex ml-2 items-center justify-center bg-white text-black w-[58px] rounded-md text-sm h-[25px]"
                            >
                              More <GrCircleInformation className="ml-1" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
          </div>
          <div>
            {videos !== null && (
              <div className="flex w-[90vw]">
                {/* {IsLoading && <Skeleton youtubeSkeleton={true} />} */}
                {videos.map((video, index) => (
                  <React.Fragment key={index}>
                    <div className="px-[20px] ">
                      <div className="border-[1px] border-solid border-gray-400">
                        <div className=".iframe-container">
                          <iframe height={300} src={`https://www.youtube.com/embed/${video.key}?si=T8cgcDbALgRv2cMx`} title="YouTube video player" allowFullScreen></iframe>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
          {/* cast */}
          {cast !== null && (
            <div className="flex mb-5 flex-col px-0 mx-0">
              <div className="flex">
                {cast.map((item, index) => (
                  <React.Fragment key={index}>
                    <Person
                      name={item.original_name}
                      character={item.character}
                      url={
                        item.profile_path !== null
                          ? `https://image.tmdb.org/t/p/w500/${item.profile_path}`
                          : `/image-not-found.jpg`
                      }
                      dept={item.known_for_department}
                      id={item.id}
                    />
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
          <div className={`invisible lg:visible `}>
            <AiOutlineArrowRight
              className={`text-5xl absolute top-[100px] right-[20px] cursor-pointer ${
                isMouseHovered ? "" : "hidden"
              }`}
              onClick={() => navigation("right")}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Carousel;
