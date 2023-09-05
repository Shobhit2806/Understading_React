import { CDN_URL } from "../utils/constants";

const SearchResults = (props) => {
  const { searchData } = props;

  return (
    <>
      {searchData?.map((card, index) => {
        return (
          <div
            key={index}
            data-testid="resCard"
            className="res-card m-4 p-2 w-[250px] h-[500px]  bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <img
              className="food_img rounded-lg"
              src={CDN_URL + card.cloudinaryId}
              alt=""
            />
            <h3 className="font-bold py-4 text-lg">{card.text}</h3>
          </div>
        );
      })}
    </>
  );
};

export default SearchResults;