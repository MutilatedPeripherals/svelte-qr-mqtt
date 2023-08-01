import {render} from "@testing-library/react";
import React from "react";
import HandheldContainer from "../components/HandheldContainer";

vi.mock("react-router-dom", () => ({
    useLocation: () => ({
        pathname: "localhost:3000/example/path"
    })
}))

test('Renders Handheld page correctly', async () => {
    render(<HandheldContainer/>);
});

