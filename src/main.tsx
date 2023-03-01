import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home'
import './index.css'
import uuid from "react-uuid";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

let id: string = (import.meta.env.VITE_DEBUG) ? "test123" : uuid();

if (import.meta.env.VITE_DEBUG) {
    console.log("Client ID: " + id)
}

// Source: https://reactrouter.com/en/main/start/tutorial
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home id={id}/>,
    }
]);


root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);