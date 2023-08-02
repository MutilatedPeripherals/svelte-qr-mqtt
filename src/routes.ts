import Home from "./components/Home.svelte";
import Handheld from "./components/Handheld.svelte";

const routes = [
    {
        name: '/react-qr-mqtt',
        component: Home
    },
    {
        name: '/react-qr-mqtt/handheld',
        component: Handheld
    }
]

export {routes}