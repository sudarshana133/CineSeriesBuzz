import React, { useContext, useEffect, useState } from "react";
import { fetchFromAPI } from "./utils/Fetch";
import Trending from "./Trending";
import CategoryContext from "../context/categoryContext/CategoryContext";
import SearchContext from "../context/searchContext/SearchContext";
import Skeleton from "./Skeleton";
import TopRated from "./TopRated";
import { GrCircleInformation } from "react-icons/gr";
import Trailer from "./Trailer";
import UserCollection from "./usersList/UserCollection";
import GenreData from "./GenreData";

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);
  const [dayOrWeek, setDayOrWeek] = useState(
    localStorage.getItem("dayOrWeek") || "day"
  );
  const [random, setRandom] = useState({});
  const [id, setId] = useState("");
  const [yes, setYes] = useState(false);
  var CategoryVar = useContext(CategoryContext);
  const GenerIds = [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Music",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "War",
    },
    {
      id: 37,
      name: "Western",
    },
  ];
  const tvGenreIds = [
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 37,
      name: "Western",
    },
  ];
  useEffect(() => {
    setIsLoading(true);
    fetchFromAPI(`/trending/${CategoryVar.category}/${dayOrWeek}`)
      .then((data) => {
        setTrending(data.results);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [dayOrWeek, CategoryVar.category]);
  // console.log(trending)

  // to store the day or week in local storage
  useEffect(() => {
    localStorage.setItem("dayOrWeek", dayOrWeek);
  }, [dayOrWeek]);

  // calling the random function
  useEffect(() => {
    if (trending.length !== 0) Random(trending);
  }, [trending]);
  // setting the random movie
  const Random = (arr) => {
    const randomInt = Math.floor(Math.random() * arr.length);
    // console.log(randomInt)
    setRandom(arr[randomInt]);
    // console.log(random)
  };
  // loading skeleton
  if (IsLoading)
    return (
      <div className="mt-2">
        <div>
          <Skeleton confirmHomePage="true" />
        </div>
        <div className="mt-[30px] ml-[40px]">
          <Skeleton number={4} />
        </div>
        <div className="mt-[30px] ml-[40px]">
          <Skeleton number={4} />
        </div>
      </div>
    );
  return (
    <div>
      {yes && (
        <div className="modal">
          <Trailer id={id} setYes={setYes} />
        </div>
      )}
      <div className={`random relative ${yes ? "blurring" : ""}`}>
        {
          <>
            <div
              className="absolute top-0 left-0 w-[100%] h-[100%] "
              style={{ boxShadow: "360px 0 1900px rgba(0,0,0,0.6) inset" }}
            ></div>
            <div
              className="flex w-full h-[460px] flex-col"
              style={{
                backgroundImage: `url('https://image.tmdb.org/t/p/w1280/${random.backdrop_path}')`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            >
              <div className="z-10 flex flex-col ml-5 translate-y-[40px] sm:translate-y-[60px] md:translate-y-[80px] lg:translate-y-[60px]">
                <div>
                  <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-4xl font-[900] lg:w-[500px]">
                    {CategoryVar.category === "movie"
                      ? random.title
                      : random.name}
                  </h1>
                </div>
                <div>
                  <p className="w-[250px] sm:w-[260px] md:w-[310px] lg:w-[400px] text-sm md:text-[16px] md:leading-6 lg:text-lg text-justify mt-5">
                    {random?.overview?.substr(0, 200)} . . .
                  </p>
                </div>
                <div className="play flex mt-4 cursor-pointer">
                  <p
                    onClick={() => {
                      setYes(true);
                      setId(random.id);
                    }}
                    className="flex justify-center items-center bg-white text-black w-[50px] rounded-md text-sm h-[25px]"
                  >
                    Play
                  </p>
                  <a
                    href={`/${CategoryVar.category}/${random.id}`}
                    className="flex ml-2 items-center justify-center bg-white text-black w-[58px] rounded-md text-sm h-[25px]"
                  >
                    More <GrCircleInformation className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </>
        }
      </div>
      <div className="container overflow-hidden">
        <div className="flex items-end justify-between ml-[44px] lg:ml-[54px]">
          <div className="heading">
            <h1 className="mt-[30px] font-semibold text-[18px] sm:text-base md:text-lg lg:text-xl">
              Trending
              <span className="ml-2 text-red-600">
                {CategoryVar.category === "tv" ? "TV Shows" : "Movies"}
              </span>
            </h1>
          </div>
          <div
            className="dayOrWeek flex rounded-md overflow-hidden cursor-pointer text-sm md:text-sm lg:text-base mr-2"
            style={{ border: "2px solid red" }}
          >
            <p
              className="px-1"
              style={
                dayOrWeek === "day"
                  ? { border: "1px solid red", backgroundColor: "red" }
                  : { border: "1px solid gray" }
              }
              onClick={() => setDayOrWeek("day")}
            >
              Day
            </p>
            <p
              className="px-1"
              style={
                dayOrWeek === "week"
                  ? { border: "1px solid red", backgroundColor: "red" }
                  : { border: "1px solid gray" }
              }
              onClick={() => setDayOrWeek("week")}
            >
              Week
            </p>
          </div>
        </div>
        <div className="items mt-2">
          <Trending
            trending={trending}
            tvOrMovie={CategoryVar.category === "movie" ? `movie` : `tv`}
          />
        </div>
        <div className="mt-2">
          <h1 className="ml-[44px] lg:ml-[54px] mt-[30px] font-semibold text-[18px] sm:text-base md:text-lg lg:text-xl">
            Top Rated
            <span className="ml-2 text-red-600">
              {CategoryVar.category === "tv" ? "TV Shows" : "Movies"}
            </span>
          </h1>
          <TopRated
            tvOrMovie={CategoryVar.category === "movie" ? `movie` : `tv`}
          />
        </div>
        {CategoryVar.category==='movie' && GenerIds.map((item, index) => (
          <div className="mt-2" key={index}>
            <h1 className="ml-[44px] lg:ml-[54px] mt-[30px] font-semibold text-[18px] sm:text-base md:text-lg lg:text-xl">
              Top Rated {item.name}
              <span className="ml-2 text-red-600">
                {CategoryVar.category === "tv" ? "TV Shows" : "Movies"}
              </span>
            </h1>
            <GenreData
              tvOrMovie={CategoryVar.category === "movie" ? `movie` : `tv`}
              genreId={item.id}
            />
          </div>
        ))}
        {CategoryVar.category==='tv' && tvGenreIds.map((item, index) => (
          <div className="mt-2" key={index}>
            <h1 className="ml-[44px] lg:ml-[54px] mt-[30px] font-semibold text-[18px] sm:text-base md:text-lg lg:text-xl">
              Top Rated {item.name}
              <span className="ml-2 text-red-600">
                {CategoryVar.category === "tv" ? "TV Shows" : "Movies"}
              </span>
            </h1>
            <GenreData
              tvOrMovie={CategoryVar.category === "movie" ? `movie` : `tv`}
              genreId={item.id}
            />
          </div>
        ))}
      </div>
      <div className="mt-1 mb-3 flex justify-center items-center">
        <UserCollection />
      </div>
    </div>
  );
};

export default Home;
