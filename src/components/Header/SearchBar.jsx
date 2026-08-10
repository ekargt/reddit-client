import {useState} from "react"
import "./SearchBar.css"
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function SearchBar(){
    const [searchTerm,setSearchTerm]=useState("")
    const navigate=useNavigate()

    function handleTyping(event){
        setSearchTerm(event.target.value)
    }

    function handleSubmit(event){
        event.preventDefault();
        const trimmed = searchTerm.trim();
        if (!trimmed) return;
        navigate(`/?search=${encodeURIComponent(trimmed)}`)
    }

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
             <div className="search-wrapper">

                <span className="search-icon">
                    <FiSearch />
                </span>
            <input className="search-input" type="text" value={searchTerm} onChange={handleTyping} placeholder="Search Reddit..." />
            </div>
            <button className="search-button" type="submit">
                Search
            </button>
        </form>  
    )
}

export default SearchBar