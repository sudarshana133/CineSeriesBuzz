import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import CategoryContext from "./context/categoryContext/CategoryContext";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { username, email, accessToken } = user;
  const [movieCollection, setMovieCollection] = useState([]);
  const [tvCollection, settvCollection] = useState([]);
  const { setCategory } = useContext(CategoryContext);

  useEffect(() => {
    const getMovieCollection = async () => {
      try {
        const res = await axios.post(
          'http://localhost:8000/api/collection/movie',
           { username: username },
          {
            headers: { token: "Bearer " + accessToken },
          }
        );
        setMovieCollection(res.data);
      } catch (error) {
        console.error("Error fetching movie collection:", error);
      }
    };
    getMovieCollection();
  }, [username, accessToken]);

  useEffect(() => {
    const getTVCollection = async () => {
      try {
        const res = await axios.post(
          `http://localhost:8000/api/collection/tv`,
          { username: username },
          {
            headers: { token: "Bearer " + accessToken },
          }
        );
        settvCollection(res.data);
      } catch (error) {
        console.error("Error fetching TV collection:", error);
      }
    };
    getTVCollection();
  }, [username, accessToken]);

  return (
    <div className="flex items-start justify-center h-screen  w-full bg-black text-white">
      <div className="bg-[#222] p-5 rounded shadow-md mt-[80px]">
        <h1 className="text-3xl font-semibold mb-4 text-blue-500">
          {username}
        </h1>
        <p className="text-gray-400 mb-6">Email: {email}</p>

        <div>
          <div className="my-4">
            <h2 className="text-lg font-semibold mb-2">
              Your Movie Collections
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {movieCollection.length !== 0 ? (
                movieCollection.map((item, index) => (
                  <a
                    href={`collection/movie/${item.title}`}
                    key={index}
                    onClick={() => setCategory("movie")}
                  >
                    <div className="p-4 border border-gray-400 rounded-md transition duration-300 hover:bg-gray-800 hover:text-white">
                      <h1 className="text-lg font-semibold">{item.title}</h1>
                    </div>
                  </a>
                ))
              ) : (
                <h1 className="text-red-500">No Collection</h1>
              )}
            </div>
          </div>

          <h2 className="text-lg font-semibold mb-2">
            Your TV Show Collections
          </h2>
          <div className="my-4">
            <div className="grid grid-cols-2 gap-4">
              {tvCollection.length != 0 ? (
                tvCollection.map((item, index) => (
                  <a
                    href={`collection/tv/${item.title}`}
                    key={index}
                    onClick={() => setCategory("tv")}
                  >
                    <div className="p-4 border border-gray-400 rounded-md transition duration-300 hover:bg-gray-800 hover:text-white">
                      <h1 className="text-lg font-semibold">{item.title}</h1>
                    </div>
                  </a>
                ))
              ) : (
                <h1 className="text-red-500">No Collection</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
