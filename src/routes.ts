import Home from "./components/Home.svelte";
import Handheld from "./components/Handheld.svelte";

const routes = {
    '/': Home,
    '/handheld': Handheld,
}

export {routes}