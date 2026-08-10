import { render, screen, fireEvent} from "@testing-library/react";
import Error from "./Error"

test("That the default error message is displayed",()=>{
    render(<Error/>)
    expect(screen.getByText("Something went wrong."))
        .toBeInTheDocument();
})

test("That the given error message is displayed",()=>{
    render(<Error message="Couldn't load the comments" />)
    expect(screen.getByText("Couldn't load the comments"))
        .toBeInTheDocument();
})

test("That the try again button works",()=>{

    const onRetry=jest.fn()
    render(<Error onRetry={onRetry} />)
    expect(screen.getByText("Try Again"))
        .toBeInTheDocument();
    const button = screen.getByRole("button", {
        name: /Try Again/i
    });

    fireEvent.click(button);
    expect(onRetry).toHaveBeenCalled();
})

