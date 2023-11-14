import React, { useContext, useState } from "react";
import { SearchBar } from "./";
import CategoryContext from "../context/categoryContext/CategoryContext";
import { AiOutlineSearch } from "react-icons/ai";
import SearchContext from "../context/searchContext/SearchContext";
import { useLocation, useNavigate } from "react-router";
import UserAuthContext from "../context/userAuthContext/UserAuthContext";

const Header = ({ isLoginPage,isRegister }) => {
  const categoryVariable = useContext(CategoryContext);
  const { searchBox, setSearchBox, blurring, setBlurring } = useContext(SearchContext);
  const location = useLocation();
  const { user, setUser } = useContext(UserAuthContext);
  const [logout, setLogout] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };
  return (
    <>
      {searchBox && (
        <>
          <div className="flex w-full h-[60px] items-center justify-center">
            <div>
              <div className="px-4">
                <select
                  className="bg-black text-white cursor-pointer text-center rounded-md lg:w-full max-[640px]:w-[20px]"
                  style={{ border: "1px solid white" }}
                  value={categoryVariable.category}
                  onChange={(e) => categoryVariable.setCategory(e.target.value)}
                >
                  <option value="movie">Movie</option>
                  <option value="tv">TV Shows</option>
                </select>
              </div>
            </div>
            <SearchBar />
          </div>
        </>
      )}
      <div
        className={`flex bg-black items-center text-white justify-between ${
          blurring ? "invisible h-0" : "visible"
        }`}
      >
        <div className="logo flex items-center">
          <a href="/">
            <img
              src="/movie logo.jpg"
              alt=""
              className="w-[60px] sm:w-[70px] md:w-[75px] lg:w-[80px]"
            />
          </a>
          <h1 className="ml-4 text-sm sm:text-base md:text-lg lg:text-xl">
            CineSeriesBuzz
          </h1>
          {!isLoginPage && (
            <div className="px-5">
              <select
                className="bg-black text-white cursor-pointer text-center rounded-md lg:w-full max-[640px]:w-[20px]"
                style={{ border: "1px solid white" }}
                value={categoryVariable.category}
                onChange={(e) => categoryVariable.setCategory(e.target.value)}
              >
                <option value="movie">Movie</option>
                <option value="tv">TV Shows</option>
              </select>
            </div>
          )}
        </div>
        {
          !isLoginPage ? (
            <div className="search mr-10 flex gap-3 items-center relative">
          <div className="text-xl md:hidden max-[768px]:inline-block">
            <AiOutlineSearch
              onClick={() => {
                setSearchBox(true);
                setBlurring(true);
              }}
            />
          </div>
          <div className="hidden md:inline-block md:mr-5">
            <SearchBar />
          </div>
          <div
            className="profile w-7 h-7 md:h-8 md:w-8 lg:h-9 lg:w-9 overflow-hidden rounded-full cursor-pointer"
            onClick={() => setLogout((prev) => !prev)}
          >
            <img src="/netflix-user.jpg" alt="profile" />
          </div>
          <div
            className={`logout flex justify-center items-center flex-col ${
              logout ? "visible" : "hidden"
            } bg-[#1d1d1d] absolute right-[-14px] top-[50px] z-10 w-[70px] text-center mx-auto rounded-md`}
          >
            <a href="/profile">Profile</a>
            <p
              style={{ width: "70px", height: "1px", backgroundColor: "gray" }}
            ></p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
          ):(
            <a className="text-[14px] sm:text-[14.5px] md:text-[19px] lg:text-[17px] mr-2 px-2 bg-red-600 rounded-md" 
            href={`${isRegister?'/':'/register'}`}>{isRegister?'Log In':'Sign In'}</a>
          )
        }
      </div>
    </>
  );
};

export default Header;
