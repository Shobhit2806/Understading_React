import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { name, cuisines, avgRating, cloudinaryImageId } = resData?.info;

  return (
    <div className="res-card m-4 p-4 w-[250px] bg-gray-100 rounded-lg hover:bg-gray-200">
      <img
        className="food_img rounded-lg"
        src={CDN_URL + cloudinaryImageId}
        alt=""
      />
      <h3 className="font-bold py-4 text-lg">{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating} stars</h4>
      <h4>38 minutes</h4>
    </div>
  );
};

// Higher order component
// input - RestaurantCard => RestaurantCardPromoted

export const isOpenLabel = (RestaurantCard) => {
  // Returns Functional component
  return (props) => {
    //Functional  Component return jsx code.
    return (
      <div>
        <label>Is Open</label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
