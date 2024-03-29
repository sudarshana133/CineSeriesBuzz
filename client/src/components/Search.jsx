import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchFromAPI } from "./utils/Fetch.js";
import CategoryContext from "../context/categoryContext/CategoryContext";
import {Skeleton,Trailer} from "./";
import {GrCircleInformation} from "react-icons/gr"

const Search = () => {
  const { searchTerm } = useParams();
  const [movieFeed, SetMovieFeed] = useState([]);
  const [IsLoading,setIsLoading] = useState(true);
  const categoryVar = useContext(CategoryContext);
  const [yes,setYes] = useState(false);
  const [id,setId] = useState("");
  useEffect(() => {
    setIsLoading(true)
    fetchFromAPI(`search/${categoryVar.category}?query=${searchTerm}`)
      .then((data) => {
        SetMovieFeed(data.results);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [searchTerm, categoryVar.category]);
  // console.log(movieFeed);
  if (IsLoading)
  {
      return <Skeleton number={10} />;
  }
  return (
    <>
      {
      yes && (
        <div className='modal' >
          <Trailer id={id} setYes={setYes}/>
        </div>
      )
    }
    <div className={`flex flex-col ${yes ? 'blurring':''}`}>
      <div>
        <h1 className="text-2xl ml-3 mt-10 mb-4 text-center font-extrabold">
          {categoryVar.category === "movie" ? "Movie" : "TV-Shows"}
        </h1>
        <h1 className="text-lg ml-7 mt-10 mb-4 font-extrabold">
          Results for <span className="text-red-600">{searchTerm}</span>
        </h1>
      </div>
      <div className="movieTemplate grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-3 gap-2">
        {movieFeed.map((item, index) => (
          <React.Fragment key={index}>
            <div>
              <div className="flex justify-center items-center my-2 flex-col main relative overflow-hidden">
                <div className="poster rounded-md overflow-hidden ml-3">
                  <img
                    src={
                      item.poster_path !== null
                        ? `https://image.tmdb.org/t/p/w500/${item.poster_path}`
                        : `/image-not-found.jpg`
                    }
                    alt="movie-poster"
                    className="border-[1px] border-solid border-gray-400 rounded-md"
                    style={{ height: "350px" }}
                  />
                </div>
                <div className="content mx-4 w-[200px] text-justify">
                  <div className="title text-xl text-center">
                    <h3>
                      {categoryVar.category === "movie"
                        ? item.title
                        : item.name}
                    </h3>
                  </div>
                  <div className="releaseDate text-center">
                    <h3>
                      {categoryVar.category === "movie"
                        ? item.release_date?.substr(0, 4)
                        : item.first_air_date?.substr(0, 4)}
                    </h3>
                  </div>
                </div>
                {/* this is to display the details  */}
                <div className="details absolute top-[225px] max-[768px]:top-[205px] flex justify-center items-center w-full h-[135px]">
                  <div className="play mt-4 cursor-pointer">
                    <div>
                      <p className="text-[12px] mb-3 w-[170px] text-justify">
                        {item?.overview?.substr(0, 100)}
                      </p>
                    </div>
                    {/* buttons */}
                    <div className="flex justify-center mb-[30px]">
                      <p
                        onClick={() => {
                          setYes(true);
                          setId(item.id);
                        }}
                        className="btn flex justify-center items-center bg-white text-black w-[50px] rounded-md text-sm lg:h-[25px] md:h-[17px]"
                      >
                        Play
                      </p>
                      <a
                        href={`/${categoryVar.category}/${item.id}`}
                        className="btn flex ml-2 items-center justify-center bg-white text-black w-[58px] rounded-md text-sm lg:h-[25px] md:h-[17px]"
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
    </div>
  </>
  );
};

export default Search;
