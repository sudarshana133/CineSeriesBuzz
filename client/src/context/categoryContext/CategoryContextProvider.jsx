import { useState, useEffect } from "react";
import CategoryContext from "./CategoryContext";

const CategoryContextProvider = (props) => {
    const [category, setCategory] = useState(localStorage.getItem('category') || "movie");

    useEffect(() => {
        localStorage.setItem('category', category);
    }, [category]);

    return (
        <CategoryContext.Provider value={{ category, setCategory }}>
            {props.children}
        </CategoryContext.Provider>
    )
}

export default CategoryContextProvider;
