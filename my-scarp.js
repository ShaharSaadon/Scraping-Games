import puppeteer from "puppeteer"

///sets/acid-techno
const URL = 'https://soundcloud.com/shahar138'
const main = async () => {
    const browser = await puppeteer.launch({ headless: "new" })
    const page = await browser.newPage()
    await page.goto(URL,{ waitUntil: 'networkidle2' })
    const allTracks = await page.evaluate(() => {
        const tracks = document.querySelectorAll('li')
        return Array.from(tracks).slice(0, 10).map((track) => {
            const url = track.querySelector('a').href
            return { title, url }
        })
    })

    console.log('allTracks:', allTracks)
}

main()