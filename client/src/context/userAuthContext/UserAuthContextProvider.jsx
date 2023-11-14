import { useEffect, useState } from "react";
import UserAuthContext from "./UserAuthContext";

const UserAuthContextProvider = (props) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  return (
    <div>
      <UserAuthContext.Provider value={{ user, setUser }}>
        {props.children}
      </UserAuthContext.Provider>
    </div>
  );
};

export default UserAuthContextProvider;
