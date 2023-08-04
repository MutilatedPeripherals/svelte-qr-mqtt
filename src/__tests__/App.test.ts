import {render} from '@testing-library/svelte'
import App from "src/App.svelte";

describe('App', () => {
    it('renders', () => {
        render(App)
    })
})
