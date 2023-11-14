import React, { useContext, useRef } from "react";
import axios from "axios";
import UserAuthContext from "./context/userAuthContext/UserAuthContext";
import {  useNavigate } from "react-router-dom";
import { Header } from "./components";

const Register = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const { user, setUser } = useContext(UserAuthContext);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const email = emailRef.current.value;

    const sendLoginData = async () => {
      try {
        const res = await axios.post(
          `http://localhost:8000/api/auth/register`,
          { username, email, password }
        );
        // console.log(res.data);
        setUser(res.data);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    };
    sendLoginData();
  };
  return (
    <>
      <Header isLoginPage={true} isRegister={true}/>
      <form onSubmit={handleSubmit}>
        <div
          className="flex justify-center items-start h-screen"
          style={{
            background: `url(https://assets.nflxext.com/ffe/siteui/vlv3/77d35039-751f-4c3e-9c8d-1240c1ca6188/cf244808-d722-428f-80a9-052acdf158ec/IN-en-20231106-popsignuptwoweeks-perspective_alpha_website_large.jpg)`,
            boxShadow: "360px 150px 2000px rgba(0,0,0,0.75) inset",
          }}
        >
          <div className="bg-[#000] shadow-md rounded-lg px-8 py-8 pt-8 mt-[50px]">
            <div className="mb-4">
              <label
                className="block text-[#b4b4b4] text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-[#b4b4b4] leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Enter your username"
                ref={usernameRef}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-[#b4b4b4] text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-[#b4b4b4] leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email" 
                placeholder="Enter your email"
                ref={emailRef}
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-[#b4b4b4] text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-[#b4b4b4] mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="off"
                ref={passwordRef}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Register;
