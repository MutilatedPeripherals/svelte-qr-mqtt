import wrap from "svelte-spa-router/wrap";

const routes = {
    '/': wrap({
        asyncComponent: () => import('./components/Home.svelte')
    }),
    '/handheld': wrap({
        asyncComponent: () => import('./components/Handheld.svelte')
    }),
    '/canvas-test': wrap({
        asyncComponent: () => import('./components/CanvasTest.svelte')
    }),
}

export { routes }