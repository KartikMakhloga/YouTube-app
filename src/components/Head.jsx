import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const dispatch = useDispatch();
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const searchCache = useSelector((store) => store.search);

  useEffect(() => {
    // API call
    console.log(searchQuery);
    // make an api call after every key press
    // but if the difference between the last key press and the current key press is more than 200ms
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      }
      getSearchSuggestions();
    }, 200);

    return () => {
      // cleanup
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestions = async (searchQuery) => {
    try {
      const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
      const json = await data.json();
      console.log(json[1]);
      setSuggestions(json[1]);

      //update cache
      dispatch(cacheResults({[searchQuery]: json[1]}));
    } catch (error) {
      console.log("Error from Suggestion api" + error);
    }
  };
  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-lg">
      <div className="flex col-span-1">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-8 rounded-full hover:bg-gray-300 p-1 hover:cursor-none"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png"
          alt=""
        />
        <img
          className="h-12 mx-2 pb-3"
          src="https://techengage.com/wp-content/uploads/2021/08/youtube-premium-lite.jpg"
          alt=""
        />
      </div>
      <div className="col-span-10 px-10 ">
        <div>
          <input
            className="w-1/2 border border-gray-400 rounded-l-full px-5"
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
          />
          <button className="border border-gray-400 rounded-r-full px-5 bg-gray-100">
            🔍
          </button>
        </div>
        {showSuggestions && (
          <div className="fixed bg bg-white py-2 px-5 w-[33rem] rounded-lg shadow-lg border border-gray-100">
            <ul>
              {suggestions.map((s) => (
                <li key={s} className="py-2 shadow-sm hover:bg-gray-100">
                  🔍 iphone
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="col-span-1">
        <img
          className="h-8"
          src="https://www.nicepng.com/png/full/128-1280406_user-icon-png.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Head;
