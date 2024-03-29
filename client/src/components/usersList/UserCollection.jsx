import axios from "axios";
import { useEffect, useState } from "react";
import { fetchFromAPI } from "../utils/Fetch";
import { Carousel } from "../";

const UserCollection = () => {
  const [collection, setCollection] = useState([]);
  const [moviesOrTVShows, setMoviesOrTVShows] = useState([]);
  const [movieOrTV,setMovieOrTV] = useState(localStorage.getItem('category'));

  useEffect(() => {
    const getCollection = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        const { username, accessToken } = user;
        try {
          const res = await axios.post(
            `https://cineseriesbuzz.onrender.com/api/collection/${movieOrTV}`,
            {
              username:username
            },
            { headers: { token: "Bearer " + accessToken } }
          );
          setCollection(res.data);
        } catch (error) {
          if(error.response.status)
          {
            return;
          }
          console.log(error);
        }
      }
    };

    getCollection();
  }, []);

  useEffect(() => {
    const fetchDetails = async (movieId) => {
      try {
        const data = await fetchFromAPI(`/${movieId}`);
        return data;
      } catch (err) {
        console.log(err);
        return null;
      }
    };

    const fetchDataForCollection = async () => {
      const updatedCollection = await Promise.all(
        collection.map(async (collectionItem) => {
          const detailsPromises = collectionItem?.objects.map(fetchDetails);
          const details = await Promise.all(detailsPromises);

          return {
            ...collectionItem,
            objects: details,
          };
        })
      );
      setMoviesOrTVShows(updatedCollection);
    };

    fetchDataForCollection();
  }, [collection]);
  return (
    <>
      <div className="flex flex-col mb-[20px]">
        {moviesOrTVShows.map((moviesOrTVShow, index) => (
          <div className="flex flex-col my-2" key={index}>
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-[18px] sm:text-base md:text-lg lg:text-xl ml-[50px]">{moviesOrTVShow.title}</h1>
              <a href={`/collection/${moviesOrTVShow.movieOrTV}/${moviesOrTVShow.title}`} className="text-blue-600">See More {`>`}</a>
            </div>
            <div className="w-[90vw] lg:w-[54vw]">
              <Carousel
                list={moviesOrTVShow.objects}
                videos={null}
                cast={null}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserCollection;
