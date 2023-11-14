import { useState } from "react";
import SearchContext from "./SearchContext";

const SearchContextProvider = (props) => {
    const [searchBox,setSearchBox] = useState(false);
    const [blurring,setBlurring] = useState(false);
    return (
    <div>
        <SearchContext.Provider value={{searchBox,setSearchBox,blurring,setBlurring}}>{props.children}</SearchContext.Provider>
    </div>
    );
};

export default SearchContextProvider;
