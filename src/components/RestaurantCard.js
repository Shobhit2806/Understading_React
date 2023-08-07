import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { name, cuisines, avgRating, cloudinaryImageId } = resData?.info;

  return (
    <div className="res-card">
      <img
        className="food_img"
        src={
          CDN_URL +
          cloudinaryImageId
        }
        alt=""
      />
      <h3>{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating} stars</h4>
      <h4>38 minutes</h4>
    </div>
  );
};

export default RestaurantCard;
