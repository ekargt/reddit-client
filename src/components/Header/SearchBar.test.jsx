import { render, screen, fireEvent} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar.jsx"
import { searchRedditByTerm } from "../../features/search/searchSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn(),
}));

test("renders the search input from the user",()=>{
    render(<SearchBar/>)
    const input = screen.getByPlaceholderText("Search Reddit...");
    expect(input).toBeInTheDocument()
})

test("updates the input while the user is typing",()=>{
    render(<SearchBar/>)
    const input = screen.getByPlaceholderText("Search Reddit...");
    fireEvent.change(input,{
        target:{value:"cats"}
    })
    expect(input.value).toBe("cats")
})

test("updates the search parameter by navigating the route based on the user's input",()=>{
    const navigate=jest.fn()
    useNavigate.mockReturnValue(navigate)
    render(<SearchBar/>)
    const input = screen.getByPlaceholderText("Search Reddit...");
    fireEvent.change(input,{
        target:{value:"cats"}
    })
    const button = screen.getByRole("button", { name: /search/i });
    fireEvent.click(button)
    expect(navigate).toHaveBeenCalledWith(`/?search=cats`);

})

