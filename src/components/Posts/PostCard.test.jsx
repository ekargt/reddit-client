import { render, screen, fireEvent} from "@testing-library/react";
import PostCard from "./PostCard.jsx"
import { setSelectedPost } from "../../features/selectedPosts/selectedPostSlice.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

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

test("That the card displays the correct information for the post",()=>{
    render(<PostCard post={mockPost}/>)
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

jest.mock("react-redux", () => ({
    useDispatch: jest.fn(),
}));

jest.mock("../../features/selectedPosts/selectedPostSlice.js", () => ({
  setSelectedPost: jest.fn((post) => ({
    type: "selectedPost/setSelectedPost",
    payload: post,
  })),
}));

test("selects the post for a detailed view when the user clicks on it", () => {
    const dispatch = jest.fn();

    useDispatch.mockReturnValue(dispatch);

    const navigate=jest.fn()
    useNavigate.mockReturnValue(navigate)

    render(<PostCard post={mockPost} />);

    const card = screen.getByTestId("post-card");

    fireEvent.click(card)

    expect(setSelectedPost).toHaveBeenCalledWith(mockPost);
    expect(dispatch).toHaveBeenCalled();
});


jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn(),
}));

test("user is routed to a detailed view of the post when the user clicks on it",()=>{
    const navigate=jest.fn()
    useNavigate.mockReturnValue(navigate)
    render(<PostCard post={mockPost} />);

    const card = screen.getByTestId("post-card");

    fireEvent.click(card)
    expect(navigate).toHaveBeenCalledWith(`/posts/${mockPost.data.id}`);
})
