import {render} from "@testing-library/react";
import React from "react";
import HandheldContainer from "../components/HandheldContainer";

test('Renders Handheld page correctly', async () => {
    render(<HandheldContainer/>);
});

