import React, { useState, useRef } from "react";
import classes from "./Search.module.css";
import { useNavigate } from 'react-router-dom';

const Search = props => {
  // ^ Setting States and References
  const [searching, setSearchingState] = useState(false),
    searchInput = useRef(null),
    search = useRef(null),
    [searchKeyword, setSearchKeyword] = useState(""),
    searchClasses = [classes.Search],
    navigate = useNavigate();

  // > Start Searching by opening the search input and focussing on it
  const startSearching = () => {
    setSearchingState(true);
  };

  // > End Searching by closing the search input
  const endSearching = () => {
    setSearchingState(false);
  };

  // > Recording search input value while typing
  const handleRecordSearchKeyword = e => {
    setSearchKeyword(e.target.value);
  };

  // > Handle the search process
  const handleSearch = e => {
    switch (e.key) {
      case 'Enter':
        navigate(`/search/${searchKeyword}`);
        break;

      case 'Escape':
        endSearching();
        break;

      default:
        return;
    }
  }

  // ^ Make decisions according to searching state
  if (searching) {
    searchClasses.push(classes.active);
    searchInput.current.focus();
  } else {
    if (searchClasses.length > 1) {
      searchClasses.pop();
    }
  }

  return (
    <div className={searchClasses.join(" ")} ref={search}>
      {searching ? null : (
        <div className={classes.searchIcon} onClick={startSearching}>
          <i className="ri-search-line" title='Start searching...'></i>
        </div>
      )}
      <input
        type="text"
        className={classes.searchInput}
        placeholder="Search products..."
        ref={searchInput}
        onInput={handleRecordSearchKeyword}
        onKeyDown={handleSearch}
        onBlur={endSearching}
      />
    </div>
  );
};

export default React.memo(Search);
