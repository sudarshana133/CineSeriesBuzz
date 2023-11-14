import { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom'

const Search = () => {
    const [searchTerm,setSearchTerm] = useState("");
    const searchBarRef = useRef();
    const navigate = useNavigate();
    function handleSubmit(e){
        e.preventDefault();
        if(searchTerm)
        {
            navigate(`/search/${searchTerm}`);
        }
    }
    // shortcut creation
    const body = document.body;
    body.addEventListener('keydown',(event)=>{
        const SearchBar = searchBarRef.current;
        const key = event.key;
        if(key==='/')
        {
            event.preventDefault();
            SearchBar.focus();
        }
    })
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" className="bg-[#222] rounded-md px-3 py-2" placeholder="Search..." onChange={(e)=>{setSearchTerm(e.target.value)}} autoComplete="off" ref={searchBarRef}/>
            </form>
        </>
    )
}

export default Search
