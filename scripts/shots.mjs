/* Layout-review screenshot capture (dev tooling, not shipped). */
import puppeteer from 'puppeteer-core'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const BASE = 'http://127.0.0.1:5173'

async function scrollThrough(p) {
  await p.evaluate(
    async () =>
      await new Promise((resolve) => {
        let y = 0
        const step = () => {
          y += 700
          window.scrollTo(0, y)
          if (y < document.body.scrollHeight + 700) setTimeout(step, 60)
          else resolve()
        }
        step()
      }),
  )
  await sleep(700)
}

const go = async (p, route, theme) => {
  await p.goto(BASE + route, { waitUntil: 'networkidle0' })
  if (theme) {
    await p.evaluate((t) => localStorage.setItem('avleen-theme', t), theme)
    await p.reload({ waitUntil: 'networkidle0' })
  }
  await sleep(400)
  await scrollThrough(p)
}

async function main() {
  const b = await puppeteer.launch({
    executablePath: '/usr/bin/chromium',
    headless: 'shell',
    args: ['--no-sandbox', '--hide-scrollbars'],
  })
  const p = await b.newPage()

  const shots = [
    { route: '/', theme: 'dark', offsets: [0, 950, 1900, 2850, 3800], prefix: 'hd', w: 1440, h: 950 },
    { route: '/', theme: 'light', offsets: [0, 1900, 3800], prefix: 'hl', w: 1440, h: 950 },
    { route: '/projects/netoze', theme: 'dark', offsets: [0, 950], prefix: 'net', w: 1440, h: 950 },
    { route: '/projects/one-go', theme: 'dark', offsets: [0], prefix: 'ongo', w: 1440, h: 950 },
    { route: '/projects', theme: 'dark', offsets: [0], prefix: 'proj', w: 1440, h: 950 },
  ]

  for (const s of shots) {
    await p.setViewport({ width: s.w, height: s.h })
    await go(p, s.route, s.theme)
    for (const off of s.offsets) {
      await p.evaluate((y) => window.scrollTo(0, y), off)
      await sleep(250)
      await p.screenshot({ path: `/tmp/opencode/${s.prefix}-${off}.png` })
    }
  }

  // mobile + menu open
  await p.setViewport({ width: 390, height: 844 })
  await p.goto(BASE + '/', { waitUntil: 'networkidle0' })
  await p.evaluate(() => localStorage.removeItem('avleen-theme'))
  await p.reload({ waitUntil: 'networkidle0' })
  await sleep(500)
  await p.screenshot({ path: '/tmp/opencode/mob-0.png' })
  await p.click('button[aria-controls="mobile-menu"]')
  await sleep(400)
  await p.screenshot({ path: '/tmp/opencode/mob-menu.png' })

  await b.close()
  console.log('captures done')
}

await main()
