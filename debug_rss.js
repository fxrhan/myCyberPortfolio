async function getFeed() {
    try {
        const res = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@fxrhanansari");
        const data = await res.json();
        const item = data.items[0];
        console.log("Has content:", !!item.content);
        const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/);
        console.log("Image match:", imgMatch ? imgMatch[1] : "No image found");
        console.log("Content length:", item.content.length);
    } catch (error) {
        console.error(error);
    }
}

getFeed();
