import { render, screen, fireEvent} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./Home.jsx"
import { searchRedditByTerm, selectSearchError, selectSearchLoading, searchPopularPosts } from "../features/search/searchSlice.js";
import { useDispatch,useSelector } from "react-redux";
import { useSearchParams,useNavigate } from "react-router-dom";
import { selectSubredditError,selectSubreddits } from "../features/subreddits/subredditsSlice.js";
import { selectPosts } from "../features/search/searchSlice.js";

jest.mock("react-redux", () => ({
    useDispatch: jest.fn(),
    useSelector:jest.fn()
}));

jest.mock("../features/search/searchSlice", () => ({
  searchRedditByTerm: jest.fn((term) => ({
    type: "search/searchRedditByTerm",
    payload: term,
  })),
  selectSearchError: jest.fn(),
  selectSearchLoading: jest.fn(),
  selectPosts:jest.fn(),
  searchPopularPosts:jest.fn()
}));

jest.mock("react-router-dom",()=>({
   useSearchParams: jest.fn(),
   useNavigate:jest.fn()
}))

test("dispatches a search", () => {
  const navigate=jest.fn()
  useNavigate.mockReturnValue(navigate)
     useSelector.mockImplementation(selector => {
    if (selector === selectSearchError) {
        return false;
    }

    if (selector === selectSearchLoading) {
        return false;
    }

    if (selector === selectSubredditError) {
        return false;
    }

    if (selector === selectSubreddits) {
        return [];
    }

    if (selector===selectPosts){
      return []
    }
});

    const searchParams = new URLSearchParams("?search=cats");
    useSearchParams.mockReturnValue([searchParams]);

    const dispatch = jest.fn();

    useDispatch.mockReturnValue(dispatch);

    render(<Home />);

expect(searchRedditByTerm).toHaveBeenCalledWith("cats");
expect(dispatch).toHaveBeenCalled();
});