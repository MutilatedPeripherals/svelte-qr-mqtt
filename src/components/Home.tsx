// @ts-ignore
import React, {MutableRefObject, useLayoutEffect, useRef, useState} from 'react'
// @ts-ignore
import QrContainer from "./QrContainer.svelte";

import Lyrics from './Lyrics';
import {buildHandheldUrl, buildTopic} from "../services/utils";

function Home(props: { id: string, app_mqtt_client: any }) {
    const [alternativeBackground, setAlternativeBackground] = useState(false)
    const [handheldUrl,] = useState(buildHandheldUrl(props.id))
    let [topic,] = useState(buildTopic(props.id))

    let svelteQrCodeRef: MutableRefObject<any> = useRef()
    useLayoutEffect(() => {
        // Iterate and remove all previously appended children in the ref
        while (svelteQrCodeRef.current?.firstChild) {
            svelteQrCodeRef.current?.firstChild?.remove();
        }
        new QrContainer({
            target: svelteQrCodeRef.current,
            props: {
                alternativeBackground: alternativeBackground,
                setAlternativeBackground: setAlternativeBackground,
                url: handheldUrl
            }
        })
    }, [alternativeBackground])

    // TODO: create a class for the message format
    // TODO: is it correct to subscribe here? or should it be in a useEffect?
    props.app_mqtt_client.subscribe_topic(
        topic,
        (pkt: { json: () => any; }) => {
            let parsed = pkt.json()
            if (parsed.note === "toggle-background") {
                setAlternativeBackground(!alternativeBackground)
            }
        })

    return (
        <div className={`home ${alternativeBackground ? "alternative-bg" : ""}`}>
            {alternativeBackground && <div className="alternative-bg-background"/>}
            <Lyrics
                children={
                    (<div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "center"}}>
                        <div className={"svelteQrCode"} ref={svelteQrCodeRef}/>
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
