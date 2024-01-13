import React, { cloneElement, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { fetchFromAPI } from "./utils/Fetch";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import Edit from "./Edit";
const CollectionViewPage = () => {
  const { title, movieOrTV } = useParams();
  const [collectionName, setCollectionName] = useState([]);
  const [deleteDiv, setDeleteDiv] = useState(-1);
  const [userObjects, setUserObjects] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [index, setIndex] = useState(-1);
  const collection = collectionName[0];
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [intialTitle, setInitialTitle] = useState(title);
  const [editedText, setEditedText] = useState(title);
  const [sendTitleToBackend, setSendTitleToBackend] = useState(false);
  const h1Ref = useRef(null);
  if (user) {
    useEffect(() => {
      const getCollection = async () => {
        try {
          const res = await axios.get(
            `http://localhost:8000/api/collection/${movieOrTV}/${title}/`
          );
          setCollectionName(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      getCollection();
    }, []);
  }
  useEffect(() => {
    const fetchDetails = async (movieId) => {
      try {
        const data = await fetchFromAPI(`${movieId}`);
        // console.log(data);
        return data;
      } catch (error) {
        console.error(error);
      }
    };

    const fetchDataForCollection = async () => {
      try {
        if (collectionName.length > 0) {
          const details = await Promise.all(
            collectionName[0]?.objects.map((object) => fetchDetails(object))
          );
          setCollectionName((prev) => {
            return { ...prev, 0: { ...prev["0"], objects: details } };
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataForCollection();
  }, [collectionName]);
  // handling the deleting of an item
  const handleDelete = async (index) => {
    setIndex(index);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const { username, accessToken } = user;

      // Fetching the users objects
      const res = await axios.get(
        `http://localhost:8000/api/collection/${movieOrTV}/${title}`,
        { username: username },
        { headers: { token: "Bearer " + accessToken } }
      );

      setUserObjects(res.data[0].objects);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const { username, accessToken } = user;
    const updateData = async () => {
      if (userObjects && userObjects.length > 0) {
        if (userObjects.length === 1) {
          try {
            const delCollection = await axios.delete(
              `http://localhost:8000/api/collection/delete/${title}/${username}`,
              { headers: { token: "Bearer " + accessToken } }
            );
            navigate("/");
          } catch (error) {
            console.log(error);
          }
        }
        if (index >= 0 && index < userObjects.length) {
          userObjects.splice(index, 1);
        }

        const putRes = await axios.put(
          `http://localhost:8000/api/collection/update/${title}/${username}`,
          { objects: userObjects },
          { headers: { token: "Bearer " + accessToken } }
        );

        const updatedData = putRes.data;

        const newData = {
          _id: updatedData._id,
          username: updatedData.username,
          title: updatedData.title,
          desc: updatedData.desc,
          objects: updatedData.objects,
          __v: updatedData.__v,
        };

        setCollectionName([newData]);
      }
    };
    updateData();
  }, [userObjects]);

  // handling the text of title entered by the user
  const handleInput = (event) => {
    if(h1Ref.current)
    {
      setEditedText(event.target.innerText);
    }
  };
  // handling the data to be sent to backend
  if (user) {
    if (sendTitleToBackend) {
      editedText.trim();
      if(editedText!=="")
      {
        const { username, accessToken } = user;
        const handleSendingTheUpdatedTitle = async () => {
          try {
            const res = await axios.post(
              `http://localhost:8000/api/collection/update/${title}`,
              { username: username, title: editedText },
              {
                headers: {
                  token: "Bearer " + accessToken,
                },
              }
            );
            navigate(`/collection/movie/${editedText}`);
          } catch (error) {
            console.log(error);
          }
        };
        handleSendingTheUpdatedTitle();
      }
    }
  }
  return (
    <div>
      <div className="flex justify-center w-full flex-col sm:flex-row">
        <div
          className="sidebar flex flex-col items-center bg-[#212121] h-[88.5vh] lg:ml-[1px] lg:sticky lg:top-[80px] md:sticky md:top-[80px]"
          style={{ flex: "0.7" }}
        >
          <div className="image mt-2">
            <div className="px-2 py-1 w-[260px]">
              {collection?.objects !== null && (
                <img
                  src={`https://image.tmdb.org/t/p/w500/${collection?.objects[0].backdrop_path}`}
                  className="rounded-md"
                />
              )}
            </div>
          </div>

          <div className="flex items-center justify-center gap-2">
            <div className="desc text-[13px] md:text-[15px] lg:text-[15px] py-1 text-justify font-bold text-[#5055eb]">
              <h1
                contentEditable={isEditing === true ? true : false}
                onInput={handleInput}
                ref={h1Ref}
              >
                {editedText}
              </h1>
            </div>
            {/* <Edit
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              initialTitle={intialTitle}
              setInitialTitle={setInitialTitle}
              setSendTitleToBackend={setSendTitleToBackend}
            /> */}
          </div>

          <div className="desc text-[13px] sm:h-[100px] md:text-[14px] lg:text-[15px] p-3 text-justify">
            <h1>{collectionName[0]?.desc}</h1>
          </div>
        </div>
        <div className="main1 px-3" style={{ flex: "2" }}>
          {collection?.objects !== null &&
            collection?.objects.map((item, index) => (
              <div
                key={index}
                className="collectionItems flex py-2 my-1 px-2 rounded-md"
              >
                <a href={`/${movieOrTV}/${item.id}`}>
                  <div className="flex items-center">
                    <div>
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
                        alt=""
                        className="rounded-lg"
                        style={{ border: "1px solid white" }}
                      />
                    </div>
                    <div className="flex flex-col mx-3">
                      <h1 className="text-[13px] sm:text-[14.5px] md:text-[16px] lg:text-[17px] font-bold text-[#4e6ce3]">
                        {item.title || item.name}
                      </h1>
                      <p className="text-[12px]  sm:h-[100px] md:text-[14px] lg:text-[15px]">
                        {item.overview?.substr(0, 100)} . . .
                      </p>
                    </div>
                  </div>
                </a>
                <div
                  className="cursor-pointer relative"
                  onClick={() => setDeleteDiv(index)}
                >
                  <BsThreeDotsVertical />
                  <div
                    className={`${
                      deleteDiv === index ? "visible" : "invisible"
                    } absolute right-0 bg-black`}
                  >
                    <div className="flex items-center justify-center px-1">
                      <h1
                        className="flex items-center"
                        onClick={() => handleDelete(index)}
                      >
                        <AiFillDelete /> Delete
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionViewPage;
