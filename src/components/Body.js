import RestaurantCard, { isOpenLabel } from "./RestaurantCard";
import resList from "../utils/mockData";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

export const Body = () => {
  const [listofRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilterRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  const RestaurantCardIsOpen = isOpenLabel(RestaurantCard);
  const {setUserName,loggedInUser} = useContext(UserContext)
  useEffect(() => {
    fetchData();
  }, []);

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
  // console.log(filteredRestaurants);
  const onlineStatue = useOnlineStatus();
  if (!onlineStatue) {
    return <h1>Looks like you are offline</h1>;
  }
  return (
    <div className="body">
      <div className="filter flex items-center">
        <div className="search-bar m-4 p-4">
          <input
            type="text"
            className="search-box border border-solid border-black"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-green-100 m-4 rounded-md"
            onClick={() => {
              //Filter the restaurants and update the UI
              // console.log(searchText);
              const filteredRestaurants = listofRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText)
              );
              setFilterRestaurants(filteredRestaurants);
            }}
          >
            Search
          </button>
        </div>
        <div>
          <button
            className="filter-btn px-4 py-2 bg-gray-100 m-4 rounded-md"
            onClick={() => {
              const filteredList = listofRestaurants.filter(
                (res) => res.info.avgRating > 4.1
              );
              setListOfRestaurants(filteredList);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
        <div>
          <label>Username</label>
          <input type="text" className="border border-black p-2" onChange={(e)=>setUserName(e.target.value)} value={loggedInUser}/>
        </div>
      </div>
      <div className="res-container flex flex-wrap">
        {filteredRestaurants?.map((resObj) => {
          return (
            <Link to={"/restaurants/" + resObj.info.id} key={resObj.info.id}>
              {resObj?.info?.isOpen ? (
                <RestaurantCardIsOpen resData={resObj} />
              ) : (
                <RestaurantCard resData={resObj} />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
