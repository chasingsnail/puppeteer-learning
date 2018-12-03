const puppeteer = require('puppeteer')
const devices = require('puppeteer/DeviceDescriptors')
const iPhone = devices['iPhone 6']

;(async () => {
  // 启动浏览器
  const browser = await puppeteer.launch({
    // 无界面 默认为true,改成false,则可以看到浏览器操作，目前生成pdf只支持无界面的操作。
    headless: false
    // 开启开发者调试模式，默认false, 也就是平时F12打开的面版
    // devtools: true,
  })
  // 打开一个标签页
  const page = await browser.newPage()

  await page.goto('https://baidu.com')
  await page.type('#kw', 'puppeteer', { delay: 100 })
  page.click('#su')
  await page.waitFor(1000)
  const targetLink = await page.evaluate(() => {
    return [...document.querySelectorAll('.result a')]
      .filter(item => {
        return (
          item.innerText && item.innerText.includes('爬虫利器 Puppeteer 实战 - 简书')
        )
      })
      .toString()
  })

  console.log(targetLink, 'targetLink')
  
  await page.goto(targetLink)

  // 关闭浏览器
  // await browser.close()
})()
