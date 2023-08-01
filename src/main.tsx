import React from 'react'
import ReactDOM from 'react-dom/client'
import HomeContainer from './components/HomeContainer'
import './index.css'
import uuid from "react-uuid";
import {createHashRouter, RouterProvider} from "react-router-dom";
import HandheldContainer from "./components/HandheldContainer";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

let id: string = (import.meta.env.VITE_DEBUG) ? "test123" : uuid();


// Source: https://reactrouter.com/en/main/start/tutorial
const router = createHashRouter([
    {
        path: "/",
        element: <HomeContainer id={id}/>,
    },
    {
        path: "/handheld",
        element: <HandheldContainer/>,
    },
    {
        path: "*",
        element: <HomeContainer id={id}/>,
    }
]);


root.render(
    <RouterProvider router={router}/>
);