/* Functional test harness (not shipped): drives the dev server with
 * system Chromium via puppeteer-core. Verifies navigation, theme toggle,
 * active-section highlighting, form validation, external-link targets,
 * project pages, mobile menu, and collects console errors.
 * Run: node scripts/smoke.mjs
 */
import puppeteer from 'puppeteer-core'
import assert from 'node:assert/strict'

const BASE = 'http://127.0.0.1:5173'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const test = (name, fn) => ({ name, fn })

async function main() {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium',
    headless: 'shell',
    args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars', '--lang=en-GB'],
    defaultViewport: { width: 1440, height: 1000 },
  })

  const results = []
  const consoleErrors = []
  const failedRequests = []

  const newPage = () => browser.newPage()

  const wirePage = async (p) => {
    p.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text())
    })
    p.on('pageerror', (err) => consoleErrors.push('[pageerror] ' + err.message))
    p.on('requestfailed', (req) => failedRequests.push(req.url() + ' — ' + (req.failure()?.errorText ?? '')))
    await p.goto(BASE, { waitUntil: 'networkidle0' })
    await p.evaluate(() => localStorage.clear())
    return p
  }

  const tests = [
    test('dark is default on first visit', async () => {
      const p = await wirePage(await newPage())
      await p.reload({ waitUntil: 'networkidle0' }) // fresh visit, no storage
      const cls = await p.evaluate(() => document.documentElement.className)
      assert.equal(cls, 'dark', `expected class "dark", got "${cls}"`)
      await p.close()
    }),

    test('light toggle persists across reload', async () => {
      const p = await wirePage(await newPage())
      await p.click('button[aria-label="Switch to light mode"]')
      await p.waitForFunction(() => !document.documentElement.classList.contains('dark'))
      const stored = await p.evaluate(() => localStorage.getItem('avleen-theme'))
      assert.equal(stored, 'light')
      await p.reload({ waitUntil: 'networkidle0' })
      const cls = await p.evaluate(() => document.documentElement.className)
      assert.notEqual(cls, 'dark', `should stay light after reload, got "${cls}"`)
      await p.close()
    }),

    test('hero renders name, tagline, CTAs', async () => {
      const p = await wirePage(await newPage())
      await p.waitForSelector('h1')
      const h1 = (await p.evaluate(() => document.querySelector('h1')?.textContent)) ?? ''
      assert.ok(h1.includes('Avleen') && h1.includes('Singh'), `h1 was "${h1}"`)
      const body = await p.evaluate(() => document.body.innerText)
      const low = body.toLowerCase()
      for (const phrase of [
        'Understanding systems. Finding weaknesses.',
        'Available for Remote Work | Open to Interesting Technical Projects',
        'Explore Projects',
        'View Résumé',
        'malware analysis',
      ]) {
        assert.ok(low.includes(phrase.toLowerCase()), `hero missing "${phrase}"`)
      }
      const buttons = await p.evaluate(() => document.querySelectorAll('button').length)
      assert.ok(buttons >= 3, `expected the two CTA buttons + toggles, got ${buttons}`)
      const portraitState = await p.evaluate(() => {
        const img = document.querySelector('img[alt="Portrait of Avleen Singh"]')
        if (!img) return 'absent — original portrait file not added yet'
        return img.complete && img.naturalWidth > 0 ? 'loaded' : 'broken'
      })
      // Legit states: loaded (file present) or absent (file not added yet).
      assert.ok(portraitState !== 'broken', `portrait image state: ${portraitState}`)
      await p.close()
    }),

    test('external links: résumé/GitHub/LinkedIn/TryHackMe open in new tab', async () => {
      const p = await wirePage(await newPage())
      const externals = await p.evaluate(() =>
        [...document.querySelectorAll('a[href*="drive.google.com"], a[href*="linkedin.com"], a[href*="github.com"], a[href*="tryhackme.com"]')].map((a) => ({
          href: a.href,
          target: a.getAttribute('target'),
          rel: a.getAttribute('rel'),
        })),
      )
      assert.ok(externals.length >= 2, `external links found: ${externals.length}`)
      for (const e of externals) {
        assert.equal(e.target, '_blank', `target must be _blank for ${e.href}`)
        assert.ok((e.rel ?? '').includes('noreferrer'), `rel must include noreferrer for ${e.href}`)
      }
      await p.close()
    }),

    test('/projects and both case studies render with correct data', async () => {
      const p = await wirePage(await newPage())
      await p.goto(`${BASE}/projects`, { waitUntil: 'networkidle0' })
      const idx = (await p.evaluate(() => document.body.innerText)).toLowerCase()
      for (const m of ['netoze', 'one-go', 'in development', 'in testing']) {
        assert.ok(idx.includes(m), `projects index missing "${m}"`)
      }

      for (const [path, must] of [
        ['/projects/netoze', ['In Development', 'Back to projects', 'One-Go']],
        ['/projects/one-go', ['In Testing', 'Back to projects', 'NETOZE', 'URL validation']],
      ]) {
        await p.goto(`${BASE}${path}`, { waitUntil: 'networkidle0' })
        const t = (await p.evaluate(() => document.body.innerText)).toLowerCase()
        for (const m of must) assert.ok(t.includes(m.toLowerCase()), `${path} missing "${m}"`)
        const logoLoaded = await p.evaluate(() => {
          const img = document.querySelector('article img')
          return img ? img.naturalWidth > 0 && img.complete : false
        })
        assert.ok(logoLoaded, `${path} logo did not load`)
        if (path.includes('netoze')) {
          const t2 = await p.title()
          assert.ok(/NETOZE/.test(t2), `title was "${t2}"`)
        }
        // back link works
        await p.evaluate(() => document.querySelector('a[href="/projects"]')?.click())
        await p.waitForFunction(() => location.pathname === '/projects')
      }
      await p.close()
    }),

    test('unknown project slug → 404 content', async () => {
      const p = await wirePage(await newPage())
      await p.goto(`${BASE}/projects/nope`, { waitUntil: 'networkidle0' })
      const t = await p.evaluate(() => document.body.innerText)
      assert.ok(t.includes('Wrong room.'), '404 content missing')
      await p.close()
    }),

    test('unknown route → 404 page', async () => {
      const p = await wirePage(await newPage())
      await p.goto(`${BASE}/definitely-missing`, { waitUntil: 'networkidle0' })
      const t = await p.evaluate(() => document.body.innerText)
      assert.ok(t.includes('404'), 'missing 404 marker on unknown route')
      await p.close()
    }),

    test('section spy: About highlights after hash scroll', async () => {
      const p = await wirePage(await newPage())
      await p.evaluate(() => {
        const el = document.querySelector('#about')
        el?.scrollIntoView({ behavior: 'instant', block: 'start' })
      })
      await sleep(900)
      const active = await p.evaluate(() => document.querySelector('header nav a[aria-current="page"]')?.textContent)
      assert.equal(active, 'About', `active nav was "${active}"`)
      const y = await p.evaluate(() => window.scrollY)
      assert.ok(y > 400, `scrollY ${y} — did not scroll`)
      await p.close()
    }),

    test('all reveals complete after full-page scroll', async () => {
      const p = await wirePage(await newPage())
      await p.evaluate(async () => {
        await new Promise((resolve) => {
          let y = 0
          const step = () => {
            y += 500
            window.scrollTo(0, y)
            if (y < document.body.scrollHeight + 500) setTimeout(step, 90)
            else resolve()
          }
          step()
        })
      })
      await sleep(900)
      const counts = await p.evaluate(() => ({
        all: document.querySelectorAll('.reveal').length,
        visible: document.querySelectorAll('.reveal.is-visible').length,
      }))
      assert.equal(counts.all, counts.visible, `reveals stuck: ${counts.visible}/${counts.all} visible`)
      await p.close()
    }),

    test('contact form: validation, honesty state, mailto fallback', async () => {
      const p = await wirePage(await newPage())
      await p.evaluate(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'instant' }))
      await sleep(500)
      const form = await p.$('form[aria-label="Contact form"]')
      assert.ok(form, 'contact form missing')
      await p.click('form[aria-label="Contact form"] button[type="submit"]')
      await p.waitForFunction(() => document.querySelectorAll('[id$="-error"]').length >= 3)
      const errs = await p.evaluate(() => document.querySelectorAll('[id$="-error"]').length)
      assert.equal(errs, 3, `expected 3 validation errors, got ${errs}`)

      await p.type('#contact-name', 'Test Person')
      await p.type('#contact-email', 'test@example.com')
      await p.type('#contact-message', 'Hello Avleen, this is a validation test message that is easily long enough.')
      await p.click('form[aria-label="Contact form"] button[type="submit"]')
      await p.waitForFunction(() => document.body.innerText.includes('nothing has been sent yet'))
      const mailto = (await p.evaluate(() => document.querySelector('#compose-email-link')?.getAttribute('href')) ?? '')
      assert.ok(decodeURIComponent(mailto).includes('Test Person'), 'mailto missing submitted name')
      await p.close()
    }),

    test('mobile menu opens, locks scroll, closes on Escape', async () => {
      const p = await newPage()
      await wirePage(p)
      await p.setViewport({ width: 390, height: 844 })
      const menuButton = 'button[aria-controls="mobile-menu"]'
      await newPage // noop to appease lints
      await p.click(menuButton)
      await p.waitForFunction(() => document.getElementById('mobile-menu')?.classList.contains('opacity-100'))
      const expanded = await p.$eval(menuButton, (el) => el.getAttribute('aria-expanded'))
      assert.equal(expanded, 'true')
      const lock = await p.evaluate(() => document.body.style.overflow)
      assert.equal(lock, 'hidden', 'body scroll lock missing while menu open')
      await p.keyboard.press('Escape')
      await p.waitForFunction(() => !document.getElementById('mobile-menu')?.classList.contains('opacity-100'))
      const lockAfter = await p.evaluate(() => document.body.style.overflow)
      assert.equal(lockAfter, '', 'body scroll not restored after closing')
      await p.close()
    }),
  ]

  for (const t of tests) {
    try {
      await t.fn()
      results.push(`PASS  ${t.name}`)
    } catch (err) {
      results.push(`FAIL  ${t.name}${err.message.split('\n').slice(0, 4).join('\n      ')}`)
    }
  }

  // Screenshots for layout review (light + dark + routes + mobile)
  const shot = async (path, route, { theme, w, h, full } = {}) => {
    const p = await newPage()
    await wirePage(p)
    await p.setViewport({ width: w ?? 1440, height: h ?? 1000 })
    if (theme) {
      await p.evaluate((t) => localStorage.setItem('avleen-theme', t), theme)
      await p.reload({ waitUntil: 'networkidle0' })
    }
    await p.goto(BASE + route, { waitUntil: 'networkidle0' })
    await sleep(600)
    await p.evaluate(async () => {
      await new Promise((resolve) => {
        let y = 0
        const step = () => {
          y += 700
          window.scrollTo(0, y)
          if (y < document.body.scrollHeight + 700) setTimeout(step, 70)
          else resolve()
        }
        step()
      })
    })
    await sleep(1200)
    await p.screenshot({ path, fullPage: full })
    await p.close()
  }

  await shot('/tmp/opencode/shot-home-dark-full.png', '/', { theme: 'dark' })
  await shot('/tmp/opencode/shot-home-light-full.png', '/', { theme: 'light' })
  await shot('/tmp/opencode/shot-projects.png', '/projects', { theme: 'dark' })
  await shot('/tmp/opencode/shot-netoze.png', '/projects/netoze', { theme: 'dark' })
  await shot('/tmp/opencode/shot-onego.png', '/projects/one-go', { theme: 'dark' })
  await shot('/tmp/opencode/shot-mobile-dark.png', '/', { theme: 'dark', w: 390, h: 844 })

  await browser.close()

  console.log('\n=== RESULTS ===')
  for (const r of results) console.log(r)
  console.log('\nConsole errors/warnings captured:', consoleErrors.length ? consoleErrors : 'none')
  console.log('Failed network requests:', failedRequests.length ? failedRequests : 'none')
}

await main()
