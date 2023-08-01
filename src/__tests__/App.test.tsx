import {render} from '@testing-library/react';
import {fireEvent} from '@testing-library/svelte'
import HomeContainer from '../components/HomeContainer';

// Source: https://codingwithmanny.medium.com/quick-jest-setup-with-vitejs-react-typescript-82f325e4323f

test('Renders main page correctly', async () => {
    const {container} = render(<HomeContainer id="123"/>);

    // find the svg element and click it
    const div = container.querySelector(".qrCodeInner") as HTMLDivElement;
    expect(div).not.toBeNull();
    await fireEvent.click(div);

    // assert that the class "alternative-bg" is added to the div with class "home"
    const home = container.querySelector(".home") as HTMLDivElement;
    expect(home).not.toBeNull();
    expect(home.classList.contains("alternative-bg")).toBeTruthy();
});