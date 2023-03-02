// @ts-ignore
import mqtt_client from 'u8-mqtt'

// TODO: improve this; maybe wrap it in a class, as singleton and provide good type annotations for the rest of the app

async function get_mqtt_client(): Promise<any> {
    console.log("Connecting to MQTT host: " + import.meta.env.VITE_MQTT_HOST)

    let client = mqtt_client()
        .with_websock(import.meta.env.VITE_MQTT_HOST)
        .with_autoreconnect()

    await client.connect()
    return client
}

export default get_mqtt_client
