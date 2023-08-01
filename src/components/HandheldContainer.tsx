import type MutableRefObject from 'react'
import React, {useLayoutEffect, useRef} from 'react'

import {useLocation} from 'react-router-dom'
import Handheld from "./Handheld.svelte";

export default function HandheldContainer() {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const id = searchParams.get('id') ?? "test123"

    let svelteQrCodeRef: MutableRefObject.MutableRefObject<any> = useRef()
    useLayoutEffect(() => {
        // Iterate and remove all previously appended children in the ref
        while (svelteQrCodeRef.current?.firstChild) {
            svelteQrCodeRef.current?.firstChild?.remove();
        }
        new Handheld({
            target: svelteQrCodeRef.current,
            props: {id: id}
        })
    }, [])

    return (<div className={"svelteQrCode"} ref={svelteQrCodeRef}/>);
}