// @ts-ignore
import React, {MutableRefObject, useLayoutEffect, useRef} from 'react'
import Home from "./Home.svelte";

function HomeContainer(props: { id: string }) {

    let svelteQrCodeRef: MutableRefObject<any> = useRef()
    useLayoutEffect(() => {
        // Iterate and remove all previously appended children in the ref
        while (svelteQrCodeRef.current?.firstChild) {
            svelteQrCodeRef.current?.firstChild?.remove();
        }
        new Home({
            target: svelteQrCodeRef.current,
            props: {...props}
        })
    }, [])

    return (<div className={"svelteQrCode"} ref={svelteQrCodeRef}/>);
}

export default HomeContainer
