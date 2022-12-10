# react-qr-mqtt

A simple React app that creates a QR code to be scanned with a smartphone. This opens another page on the phone, with a couple of buttons that trigger actions on the original page (via MQTT).

This is a building block of my personal website.

![](./figure.png)

## Setup

```bash
yarn install
yarn start
```

See the `.env` files for broker configuration.

Currently, the broker listed there is my own Eclipse Mosquitto instance running on a Digital Ocean droplet.
