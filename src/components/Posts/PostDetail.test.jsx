import { render, screen, fireEvent} from "@testing-library/react";
import PostDetail from "./PostDetail.jsx"
import { useDispatch, useSelector } from "react-redux";
import { findCommentsByPost,selectCommentsError,selectCommentsLoading,selectComments,selectSelectedPost } from "../../features/selectedPosts/selectedPostSlice.js";
import { useNavigate } from "react-router-dom";

const mockPost = {
    data: {
        subreddit: "r/Cricket",
        created_utc: 1784481853,
        id: "1v0wguw",
        author: "GiveMeSomeSunshine3",
        title: "Rohit Sharma is the first Indian batsman and the oldest player ever to score an ODI century at the Lord's. Final score: 138 (110)",
        selftext: "Also becomes the oldest Indian batsman to score a century in any format and the opener with most centuries in Indian cricket history.",
        score: 3216,
        num_comments: 136,
        permalink: "/r/Cricket/comments/1v0wguw/rohit_sharma_is_the_first_indian_batsman_and_the/"
    }
};

const mockComments = [
    {
        data: {
            author: "Jealous_Drop_2973",
            score: 9,
            body: "Especially when he was the only one who seemed like he could bat yesterday amid some really good bowling by England.",
            id: "1a0wguw"
        }
    },
    {
        data: {
            author: "atmafatte",
            score: 2,
            body: "He did grind it out in the beginning a bit. But that’s experience for you. He also made it count with a big daddy 100.",
            id:  "1b0wguw"
        }
    }
];

jest.mock("react-redux", () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn()
}));

jest.mock("../../features/selectedPosts/selectedPostSlice.js", () => ({
  findCommentsByPost: jest.fn((post) => ({
    type: "selectedPost/findCommentsByPost",
    payload: post,
  })),

  selectSelectedPost: jest.fn(),
  selectComments: jest.fn(),
  selectCommentsLoading: jest.fn(),
  selectCommentsError: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn(),
}));

test("fetches comments for the post being displayed in detail", () => {
    useSelector.mockImplementation(selector => {
    if (selector === selectSelectedPost) {
        return mockPost;
    }

    if (selector === selectComments) {
        return mockComments;
    }

    if (selector === selectCommentsLoading) {
        return false;
    }

    if (selector === selectCommentsError) {
        return false;
    }
});
    const dispatch = jest.fn();

    useDispatch.mockReturnValue(dispatch);

    render(<PostDetail />);

    expect(findCommentsByPost).toHaveBeenCalledWith(mockPost.data.permalink)
    expect(dispatch).toHaveBeenCalled();
});

test("That the detailed view displays the correct information for the post",()=>{
   useSelector.mockImplementation(selector => {
    if (selector === selectSelectedPost) {
        return mockPost;
    }

    if (selector === selectComments) {
        return mockComments;
    }

    if (selector === selectCommentsLoading) {
        return false;
    }

    if (selector === selectCommentsError) {
        return false;
    }
});

    render(<PostDetail />)
    expect(screen.getByText("Rohit Sharma is the first Indian batsman and the oldest player ever to score an ODI century at the Lord's. Final score: 138 (110)"))
        .toBeInTheDocument();

    expect(screen.getByText("u/GiveMeSomeSunshine3"))
        .toBeInTheDocument();

    expect(screen.getByText("Also becomes the oldest Indian batsman to score a century in any format and the opener with most centuries in Indian cricket history."))
        .toBeInTheDocument();

    expect(screen.getByText("⬆ 3216"))
        .toBeInTheDocument();

    expect(screen.getByText("💬 136"))
        .toBeInTheDocument();
})

test("That the detailed view displayed the correct comments for the post",()=>{
     useSelector.mockImplementation(selector => {
    if (selector === selectSelectedPost) {
        return mockPost;
    }

    if (selector === selectComments) {
        return mockComments;
    }

    if (selector === selectCommentsLoading) {
        return false;
    }

    if (selector === selectCommentsError) {
        return false;
    }
});
    render(<PostDetail/>)
    expect(screen.getByText("Especially when he was the only one who seemed like he could bat yesterday amid some really good bowling by England."))
        .toBeInTheDocument();
    expect(screen.getByText("He did grind it out in the beginning a bit. But that’s experience for you. He also made it count with a big daddy 100."))
        .toBeInTheDocument();
})

test("That the user is navigated to the previous route when they close the detailed view of the post",()=>{
    const navigate=jest.fn()
    useNavigate.mockReturnValue(navigate)
    render(<PostDetail/>)
    const button = screen.getByRole("button", { name: /close post/i });
    fireEvent.click(button)
    expect(navigate).toHaveBeenCalledWith(-1);
})

