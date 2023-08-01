import {render} from '@testing-library/react';
import {fireEvent} from '@testing-library/svelte'
import Home from '../components/Home';

// Source: https://codingwithmanny.medium.com/quick-jest-setup-with-vitejs-react-typescript-82f325e4323f

test('Renders main page correctly', async () => {
    // TODO: improve this with a proper mock
    let app_mqtt_client = {
        subscribe_topic: () => {
        }
    }
    const {container} = render(<Home id="123" app_mqtt_client={app_mqtt_client}/>);

    // find the svg element and click it
    const div = container.querySelector("div.svelteQrCode>div.qrCodeInner") as HTMLDivElement;
    expect(div).not.toBeNull();
    await fireEvent.click(div);

    // assert that the class "alternative-bg" is added to the div with class "home"
    const home = container.querySelector(".home") as HTMLDivElement;
    expect(home).not.toBeNull();
    expect(home.classList.contains("alternative-bg")).toBeTruthy();
});