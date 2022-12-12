import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'

import { getClient, buildTestTopic } from '../modules/mqtt_utils';

import { TOGGLE_BACKGROUND } from '../constants';

import { useLocation } from 'react-router-dom'

export default function Handheld() {

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const id = searchParams.get('id')

    const [client,] = useState(getClient(id))
    const topic = buildTestTopic(id)

    useEffect(() => {
        if (client.connected) {
            return
        }
    }, [client.connected])


    const mqttPublish = (msg) => () => {
        if (client) {
            client.publish(topic, msg, 2, error => {
                if (error) {
                    console.log('Publish error: ', error);
                }
            });
        }
    }

    return (
        <div className="mt-4 p-5 d-grid gap-3">
            <Button variant="warning" size="lg" onClick={mqttPublish(TOGGLE_BACKGROUND)}>
                Action 1
            </Button>
            <Button variant="dark" size="lg">
                Action 2
            </Button>
        </div >
    )
}
