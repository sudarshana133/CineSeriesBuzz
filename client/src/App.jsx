import { CastProfile, Header, Home, Movie, Search, TVShow } from "./components";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import SearchContext from "./context/searchContext/SearchContext";
import UserAuthContext from "./context/userAuthContext/UserAuthContext";
import Login from "./Login";
import Register from "./Register";
import CollectionViewPage from "./components/CollectionViewPage";
import Profile from "./Profile";

function App() {
  const { setSearchBox, setBlurring } = useContext(SearchContext);
  const { user, setUser } = useContext(UserAuthContext);

  // Check if the user is authenticated
  const isAuthenticated = user !== null ? true : false;

  return (
    <BrowserRouter>
      {isAuthenticated && <Header/>}
      <Routes>
        {!isAuthenticated && <Route path="/register" element={<Register />} />}
        <Route
          path="/"
          exact
          element={
            isAuthenticated ? (
              <div
                onClick={() => {
                  setSearchBox(false);
                  setBlurring(false);
                }}
              >
                <Home />
              </div>
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/search/:searchTerm"
          element={
            isAuthenticated ? (
              <div
                onClick={() => {
                  setSearchBox(false);
                  setBlurring(false);
                }}
              >
                <Search />
              </div>
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/tv/:TVShowId"
          element={
            isAuthenticated ? (
              <div
                onClick={() => {
                  setSearchBox(false);
                  setBlurring(false);
                }}
              >
                <TVShow />
              </div>
            ) : (
              <Login />
            )
          }
        />
        {
          <Route
            path="/movie/:MovieId"
            element={
              isAuthenticated ? (
                <div
                  onClick={() => {
                    setSearchBox(false);
                    setBlurring(false);
                  }}
                >
                  <Movie />
                </div>
              ) : (
                <Login />
              )
            }
          />
        }
        <Route
          path="/cast/:castName/:castId"
          element={
            isAuthenticated ? (
              <div
                onClick={() => {
                  setSearchBox(false);
                  setBlurring(false);
                }}
              >
                <CastProfile />
              </div>
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              <div
                onClick={() => {
                  setSearchBox(false);
                  setBlurring(false);
                }}
              >
                <Profile />
              </div>
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/collection/:movieOrTV/:title"
          element={
            isAuthenticated ? (
              <div
                onClick={() => {
                  setSearchBox(false);
                  setBlurring(false);
                }}
              >
                <CollectionViewPage />
              </div>
            ) : (
              <Login />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
