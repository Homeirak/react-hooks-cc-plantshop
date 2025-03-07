//Search.js
import React from "react";

function Search({ searchTerm, setSearchTerm}) {
  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        value={searchTerm}
        onChange={(e) => {
          console.log("Search term:", e.target.value);
          setSearchTerm(e.target.value);
        }} 
      /> 
    </div>
  );
}

export default Search;


//console.log("Searching..."