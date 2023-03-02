import React, {useState} from 'react'
import QRCode from 'react-qr-code';


import Lyrics from './Lyrics';
import {buildHandheldUrl, buildTopic} from "../services/utils";

function Home(props: { id: string, app_mqtt_client: any }) {
    const [alternativeBackground, setAlternativeBackground] = useState(false)

    const [handheldUrl,] = useState(buildHandheldUrl(props.id))
    let topic = buildTopic(props.id)

    props.app_mqtt_client.subscribe_topic(
        topic,
        (pkt: { json: () => any; }) => {
            let parsed = pkt.json()
            if (parsed.note === "toggle-background") {
                setAlternativeBackground(!alternativeBackground)
            }
        })

    return (<div className={`home ${alternativeBackground ? "alternative-bg" : ""}`}>
        {alternativeBackground && <div className="alternative-bg-background"/>}
        <Lyrics
            children={
                (<div style={{height: "auto", margin: "0 auto", maxWidth: 80, width: "100%"}}>
                    <QRCode
                        onClick={() => setAlternativeBackground(!alternativeBackground)}
                        size={256}
                        style={{height: "auto", maxWidth: "100%", width: "100%"}}
                        bgColor={alternativeBackground ? "#000000" : "#FFFFFF"}
                        fgColor={alternativeBackground ? "#FFFFFF" : "#000000"}
                        value={handheldUrl}
                        viewBox={`0 0 ${256} ${256}`}
                    />
                </div>)}/>
        <div className="home__footer">
            <div className="can-can-bc">
                <a className={`${alternativeBackground ? "alternative-bg" : ""}`}
                   href="https://www.youtube.com/@pichudequito/videos"
                   target="_blank">Band:
                    Can Can
                    (Ecuador)</a>
            </div>
            <div className="github-link">
                <a className={`${alternativeBackground ? "alternative-bg" : ""}`}
                   href="https://github.com/linomp/react-qr-mqtt"
                   target="_blank"><i
                    className="fab fa-github"></i></a>
            </div>
        </div>

    </div>);
}

export default Home
