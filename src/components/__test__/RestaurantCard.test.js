import { render,screen } from "@testing-library/react"
import RestaurantCard from "../RestaurantCard"
import "@testing-library/jest-dom";
import MOCK_DATA from "../../mocks/ResCardMock.json"

import "@testing-library/jest-dom";
import { execPath } from "process";

test("should render Restaurant Card component with props data",()=>{
    
    // 1. Render
    render(<RestaurantCard resData={MOCK_DATA}/>)
    console.log(MOCK_DATA.resData);
    // 2. Query
    const name = screen.getByText("Madurai Idly Shop")

    // 3.Asserion
    expect(name).toBeInTheDocument()
})