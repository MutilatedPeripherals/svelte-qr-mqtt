import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './components/Home'
import './index.css'
import uuid from "react-uuid";
import {createHashRouter, RouterProvider} from "react-router-dom";
import Handheld from "./components/Handheld";
import get_mqtt_client from "./services/mqtt";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

let app_mqtt_client = await get_mqtt_client()
let id: string = (import.meta.env.VITE_DEBUG) ? "test123" : uuid();


// Source: https://reactrouter.com/en/main/start/tutorial
const router = createHashRouter([
    {
        path: "/",
        element: <Home id={id} app_mqtt_client={app_mqtt_client}/>,
    },
    {
        path: "/handheld",
        element: <Handheld app_mqtt_client={app_mqtt_client}/>,
    },
    {
        path: "*",
        element: <Home id={id} app_mqtt_client={app_mqtt_client}/>,
    }
]);


root.render(
    <RouterProvider router={router}/>
);