export function buildTopic(id: string): string {
    return `${id}/commands`
}

export function buildHandheldUrl(id: string): string {
    let url = window.location.href + "handheld?id=" + id
    console.log("Handheld URL: " + url)

    return url;
}