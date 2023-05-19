
export function redirect(pathname: string) {
    return { redirect: { permanent: false, destination: pathname }, props: {} };
}

export function notConnected() {
    return redirect("/not-connected");
}

export function getFormattedURL(url: string): string {
    let prefixLength = 0;

    if (url.startsWith("http://")) {
        prefixLength = 7;
    } else if (url.startsWith("https://")) {
        prefixLength = 8;
    } else {
        prefixLength = 0;
    }

    const withoutPrefix = url.substring(prefixLength, url.length);
    const slashIndex = withoutPrefix.indexOf("/");

    if (slashIndex === -1) {
        return withoutPrefix;
    }

    return withoutPrefix.substring(0, slashIndex);
}