import './index.css'
import App from "./App.svelte";

(async function() {
    document.body.innerHTML = ''
    new App({target: document.body})
}())