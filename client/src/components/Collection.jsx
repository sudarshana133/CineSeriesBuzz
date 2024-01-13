import { ImCross } from "react-icons/im";
import { AiOutlinePlus } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Collection = ({ setIsCollectionInvoked, movieOrTVShowId,movieOrTV }) => {
  // state for storing the checkboxes
  const [newCollection, setNewCollection] = useState(false);
  const [titleNullCheck, setTitleCheckNull] = useState(false);
  const [descNullCheck, setDescCheckNull] = useState(false);
  const titleRef = useRef();
  const [checkboxes, setCheckboxes] = useState([]);
  const descRef = useRef();

  // getting all collections
  const [collections, setCollections] = useState([]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const { username, accessToken } = user;

      const func = async () => {
        try {
          const res = await axios.post(
            `http://localhost:8000/api/collection/${movieOrTV}`,
            {
              username:username
            },
            {
              headers: {
                token: "Bearer " + accessToken,
              },
            }
          );

          setCollections(res.data);
        } catch (error) {
          console.error(error);
        }
      };
      func();
    }
  }, []);

  // creating the new collection
  const handleSubmit = (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const description = descRef.current.value;
    if (title === "") setTitleCheckNull(true);
    if (description === "") setDescCheckNull(true);
    else {
      setIsCollectionInvoked(false);
      const func = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
          const { username, accessToken } = user;
          const data = {
            username: username,
            title: title,
            desc: description,
            objects: [ movieOrTVShowId],
            movieOrTV:movieOrTV,
          };
          try {
            const res = await axios.post(
              `http://localhost:8000/api/collection/create`,
              data,
              {
                headers: {
                  token: "Bearer " + accessToken,
                },
              }
            );
          } catch (error) {
            console.log(error);
          }
        }
      };
      func();
    }
  };

  const handleDone = async () => {
    const checkboxData = [];
    const getOriginalData = async (checkbox) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const { username, accessToken } = user;
      try {
        const res = await axios.get(
          `http://localhost:8000/api/collection/${movieOrTV}/${checkbox}`,
          {
            username:username
          },
          {
            headers: {
              token: "Bearer " + accessToken,
            },
          }
        );
        checkboxData.push(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    await Promise.all(
      checkboxes.map(async (checkbox) => {
        await getOriginalData(checkbox);
      })
    );
    const updatedData = checkboxData.map((prev) => ({
      ...prev[0],
      objects: [...prev[0].objects, movieOrTVShowId],
    }));

    // updating here
    const updateObjects = async (title, objects) => {
      const user = JSON.parse(localStorage.getItem("user"));
      const { username, accessToken } = user;
      try {
        const res = await axios.put(
          `http://localhost:8000/api/collection/update/${title}/${username}`,
          { title: title, objects: objects },
          {
            headers: {
              token: "Bearer " + accessToken,
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    };
    await Promise.all(
      updatedData.map(async (item) => {
        await updateObjects(item.title, item.objects);
      })
    );
    setIsCollectionInvoked(false);
  };

  return (
    <div className="flex items-center justify-center flex-col relative bg-[#212121] text-white px-4 rounded-md py-2 w-[250px]">
      <div className="flex flex-col justify-center">
        <div className="heading flex items-center py-2 justify-center relative">
          <h1 className="text-base text-red-500 mr-4">Add to Collection</h1>
          <ImCross
            className="cursor-pointer font-extralight absolute right-0"
            onClick={() => setIsCollectionInvoked(false)}
          />
        </div>
        <div className="flex flex-col justify-center">
          {collections.length === 0 && <h1>No Collections?</h1>}
          {/* collections of user mapping */}
          {collections.length !== 0 &&
            collections.map((item) => (
              <div className="flex py-1" key={item.title}>
                <input
                  type="checkbox"
                  className="w-5 h-5 cursor-pointer"
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    const checkboxValue = e.target.value;

                    // Update the state of checkboxes based on whether it's checked or not
                    if (isChecked) {
                      setCheckboxes((prevCheckboxes) => [
                        ...prevCheckboxes,
                        checkboxValue,
                      ]);
                    } else {
                      setCheckboxes((prevCheckboxes) =>
                        prevCheckboxes.filter(
                          (value) => value !== checkboxValue
                        )
                      );
                    }
                  }}
                  value={item.title}
                />
                <h1 className="mx-2 text-base">{item?.title}</h1>
              </div>
            ))}
          <div
            className="btn flex items-center justify-center mt-2"
            onClick={handleDone}
          >
            <button className="bg-[#ff2e2e] hover:bg-[#ff0000d8] px-2 rounded-md flex items-center justify-center">
              Done
            </button>
          </div>
          <div
            className="flex items-center my-1 cursor-pointer"
            onClick={() => setNewCollection((prev) => !prev)}
          >
            <AiOutlinePlus
              className={`mr-2 ${newCollection ? "invisible" : "visible"}`}
            />
            <RxCross1
              className={`mr-1 ${
                newCollection ? "visible" : "invisible"
              } font-extralight`}
            />
            <h1 className="text-base">Create Collection</h1>
          </div>
          <div className="flex flex-col my-2">
            {newCollection && (
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="title">
                    <h1>Title</h1>
                    <input
                      type="text"
                      className="collectionTitle bg-[#212121] border-none focus:outline-none my-2"
                      style={{ borderBottom: "1px solid white" }}
                      placeholder="Enter collection name"
                      ref={titleRef}
                    />
                    {titleNullCheck && (
                      <h1 className="text-red-700 text-[13px]">Required!</h1>
                    )}
                    <h1>Description</h1>
                    <input
                      type="text"
                      placeholder="Description"
                      className="collectionTitle bg-[#212121] border-none focus:outline-none my-2"
                      style={{ borderBottom: "1px solid white" }}
                      ref={descRef}
                    />
                    {descNullCheck && (
                      <h1 className="text-red-700 text-[13px]">Required!</h1>
                    )}
                    <button className="text-red-500 text-[14px] hover:bg-[#313131] px-[3px] py-1 rounded-md">
                      Create
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
