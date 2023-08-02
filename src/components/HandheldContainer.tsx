import type MutableRefObject from 'react'
import React, {useLayoutEffect, useRef} from 'react'

import Handheld from "./Handheld.svelte";

export default function HandheldContainer() {

    let svelteQrCodeRef: MutableRefObject.MutableRefObject<any> = useRef()
    useLayoutEffect(() => {
        // Iterate and remove all previously appended children in the ref
        while (svelteQrCodeRef.current?.firstChild) {
            svelteQrCodeRef.current?.firstChild?.remove();
        }
        new Handheld({
            target: svelteQrCodeRef.current
        })
    }, [])

    return (<div className={"svelteQrCode"} ref={svelteQrCodeRef}/>);
}