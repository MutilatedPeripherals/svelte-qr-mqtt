import {render} from "@testing-library/react";
import React from "react";
import Handheld from "../components/Handheld";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
        pathname: "localhost:3000/example/path"
    })
}));

test('Renders Handheld page correctly', async () => {
    // TODO: improve this with a proper mock
    let app_mqtt_client = {
        subscribe_topic: () => {
        }
    }
    render(<Handheld app_mqtt_client={app_mqtt_client}/>);
});