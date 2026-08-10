import { render, screen, fireEvent} from "@testing-library/react";
import SideBar from "./SideBar.jsx"
import { useDispatch, useSelector } from "react-redux";
import { searchPostsBySubreddit } from "../../features/search/searchSlice.js";
import { selectSubredditLoading,selectSubreddits } from "../../features/subreddits/subredditsSlice.js";

const mockSubreddits = [
    {
        data: {
            display_name: "AskReddit",
            icon_img: "https://example.com/askreddit.png"
        }
    },
    {
        data: {
            display_name: "technology",
            icon_img: "https://example.com/technology.png"
        }
    },
    {
        data: {
            display_name: "gaming",
            icon_img: "https://example.com/gaming.png"
        }
    },
    {
        data: {
            display_name: "movies",
            icon_img: "https://example.com/movies.png"
        }
    }
];

jest.mock("react-redux", () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn()
}));

jest.mock("../../features/search/searchSlice.js", () => ({
    searchPostsBySubreddit: jest.fn((subreddit) => ({
    type: "search/searchPostsBySubreddit",
    payload: subreddit,
  })),
}));


test("that the names of subreddits appear on the sidebar",()=>{
   useSelector.mockImplementation(selector => {
    if (selector === selectSubreddits) {
        return mockSubreddits;
    }

    if (selector === selectSubredditLoading) {
        return false;
    }
});
    render(<SideBar/>)
     expect(screen.getByText("r/technology"))
        .toBeInTheDocument();
     expect(screen.getByText("r/gaming"))
        .toBeInTheDocument();
    expect(screen.getByText("r/movies"))
        .toBeInTheDocument();
     expect(screen.getByText("r/AskReddit"))
        .toBeInTheDocument(); 
})

test("fetches posts for the subreddit the user has clicked on", () => {
    const dispatch = jest.fn();

    useDispatch.mockReturnValue(dispatch);
    useSelector.mockImplementation(selector => {
    if (selector === selectSubreddits) {
        return mockSubreddits;
    }

    if (selector === selectSubredditLoading) {
        return false;
    }
});

    render(<SideBar/>);

    const subreddit = screen.getByText("r/gaming");

    fireEvent.click(subreddit)

    expect(searchPostsBySubreddit).toHaveBeenCalledWith("gaming")
    expect(dispatch).toHaveBeenCalled();
});
