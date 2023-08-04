import {render, fireEvent} from '@testing-library/svelte'
import Home from "src/components/Home.svelte";

test('Renders main page correctly', async () => {
    const {container} = render(Home);

    // find the svg element and click it
    const div = container.querySelector(".qrCodeInner") as HTMLDivElement;
    expect(div).not.toBeNull();
    await fireEvent.click(div);

    // assert that the class "alternative-bg" is added to the div with class "home"
    const home = container.querySelector(".home") as HTMLDivElement;
    expect(home).not.toBeNull();
    expect(home.classList.contains("alternative-bg")).toBeTruthy();
});
