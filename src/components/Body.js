import RestaurantCard, { isOpenLabel } from "./RestaurantCard";
import resList from "../utils/mockData";
import { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import SearchResults from "./SearchResults";
export const Body = () => {
  const [listofRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilterRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const RestaurantCardIsOpen = isOpenLabel(RestaurantCard);
  const { setUserName, loggedInUser } = useContext(UserContext);
  useEffect(() => {
    fetchData();
  }, []);

  const searchData = async (e) => {
    if(e.target.value==="") return;
    const data = await fetch(
      `https://www.swiggy.com/dapi/restaurants/search/suggest?lat=28.9120152&lng=77.7122996&str=${e.target.value}`
    );
    const json = await data.json();
    // console.log(json?.data?.suggestions);
    setShowSearchResult(true);
    setSearchResult(json?.data?.suggestions);

    // setFilterRestaurants(json?.data?.suggestions)
  };

  const debounce = function (fn, delay) {
    let timer;
    return function (...args) {
      let context = this;
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        timer = null;
        fn.apply(context, args);
      }, delay);
    };
  };
  // Our debounce will be returning us a new function on every rendering.
  // That we do not want so that we will use the useCallBack hook.
  // It will provide us the memoized callback.

  // By using useCallback, you ensure that the debounced function maintains the same reference across re-renders
  // as long as its dependencies (like the debounce delay) remain the same.

  // If you don't use useCallback, a new debounced function instance is created every time the
  //component re-renders. This can lead to unnecessary re-renders of child components that depend
  //on this function. It can also disrupt the behavior of the debounce, as the timer is associated
  //with the specific instance of the debounced function.

  const DebounceSearch = useCallback(debounce(searchData, 500), []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9360036&lng=77.6808128&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();

    setListOfRestaurants(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilterRestaurants(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };
  const onlineStatue = useOnlineStatus();
  if (!onlineStatue) {
    return <h1>Looks like you are offline</h1>;
  }
  return (
    <div className="body">
      <div className="search-bar m-4">
        <div className="flex justify-center">
          <input
            data-testid="searchInput"
            type="text"
            className="search-box p-2 border border-solid border-gray-400 rounded-md w-1/2 h-10 align-middle mt-auto mb-auto"
            value={searchText}
            placeholder="Search For Restaurant"
            onChange={(e) => {
              setSearchText(e.target.value);
              DebounceSearch(e);
            }}
            onKeyUp={() => {
              if (searchText === "") {
                setShowSearchResult(false);
              }
            }}
          />
          <button
            className="px-4 py-2 bg-green-100 m-4 rounded-md"
            onClick={() => {
              //Filter the restaurants and update the UI
              console.log(searchText);
              const filteredRestaurants = listofRestaurants?.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );

              // setFilterRestaurants(filteredRestaurants);
            }}
          >
            Search
          </button>
          <div>
            <button
              className="filter-btn px-4 py-2 bg-gray-100 m-4 rounded-md"
              onClick={() => {
                console.log("clicked");
                const filteredList = listofRestaurants.filter(
                  (res) => res.info.avgRating > 4.1
                );
                console.log(filteredList);
                setFilterRestaurants(filteredList);
              }}
            >
              Top Rated Restaurants
            </button>
          </div>
        </div>

        {/* <div>
          <label>Username</label>
          <input
            type="text"
            className="border border-black p-2"
            onChange={(e) => setUserName(e.target.value)}
            value={loggedInUser}
          />
        </div> */}
      </div>
      <div className="res-container flex  flex-wrap h-[100%]">
        {showSearchResult ? (
          <SearchResults searchData={searchResult} />
        ) : (
          <>
            {console.log("here")}
            {filteredRestaurants?.map((resObj) => {
              return (
                <Link
                  to={"/restaurants/" + resObj.info.id}
                  key={resObj.info.id}
                >
                  {resObj?.info?.isOpen ? (
                    <RestaurantCardIsOpen resData={resObj} />
                  ) : (
                    <RestaurantCard resData={resObj} />
                  )}
                </Link>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Body;
