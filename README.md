# svelte-qr-mqtt

A simple Svelte app that creates a QR code to be scanned with a smartphone. This opens another page on the phone, with a
couple of buttons that trigger actions on the original page (via MQTT).

**Try it out**: [Live demo](https://linomp.github.io/svelte-qr-mqtt/)

![svelte-qr-mqtt-figure](https://user-images.githubusercontent.com/40581019/230787244-8dfb7e78-9d0b-4573-8cd4-3594cccbbe26.png)

## Setup
```bash
npm install
npm run dev
```

See the `.env` files for broker configuration.

Currently, the broker listed there is a [public Mosquitto MQTT broker](https://test.mosquitto.org/) provided by Eclipse
for testing (supports MQTT over secure web sockets).
