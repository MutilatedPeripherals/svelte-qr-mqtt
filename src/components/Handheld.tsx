import React from 'react'

import {buildTopic} from '../services/utils';

import {useLocation} from 'react-router-dom'

export default function Handheld(props: { app_mqtt_client: any }) {

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const id = searchParams.get('id') ?? "test123"

    let topic = buildTopic(id)


    const mqttPublish = (msg: string) => async () => {
        if (props.app_mqtt_client) {
            await props.app_mqtt_client.json_send(
                topic,
                {
                    note: msg,
                    live: new Date().toISOString()
                })
        }
    }

    return (
        <div className="handheld">
            <button onClick={mqttPublish("toggle-background")}>
                Action 1
            </button>
            <button onClick={() => alert("Not implemented!")}>
                Action 2
            </button>
        </div>
    )
}