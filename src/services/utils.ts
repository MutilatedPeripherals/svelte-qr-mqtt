export function buildTopic(id: string): string {
    return `${id}/commands`
}

export function buildHandheldUrl(id: string): string {
    const wl = window.location
    let url = `${wl.origin}${wl.pathname}#/handheld?id=${id}`
    console.log("Handheld URL: " + url)

    return url;
}