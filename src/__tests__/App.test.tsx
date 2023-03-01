import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../Home';

// Source: https://codingwithmanny.medium.com/quick-jest-setup-with-vitejs-react-typescript-82f325e4323f

test('Renders main page correctly', async () => {
    render(<Home id="123"/>);

    // find the svg element and click it
    const svg = document.querySelector("svg") as SVGSVGElement;
    expect(svg).not.toBeNull();
    await userEvent.click(svg);

    // assert that the class "alternative-bg" is added to the div with class "home"
    const home = document.querySelector(".home") as HTMLDivElement;
    expect(home).not.toBeNull();
    expect(home.classList.contains("alternative-bg")).toBeTruthy();
});