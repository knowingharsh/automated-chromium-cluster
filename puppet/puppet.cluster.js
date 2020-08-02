const { Cluster } = require('puppeteer-cluster')
// linux chromium dependency
// sudo yum install pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 ipa-gothic-fonts xorg-x11-fonts-100dpi xorg-x11-fonts-75dpi xorg-x11-utils xorg-x11-fonts-cyrillic xorg-x11-fonts-Type1 xorg-x11-fonts-misc
getInstance = async function () {
  if (global.singleton_instance === undefined) {

    let args = [
      // '--proxy-server=proxy.abc.com:1234',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-web-security',
      '--incognito',
      '--enable-features=NetworkService',
      '--ignore-certificate-errors',
      '--ignore-certificate-errors-spki-list',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
      '--window-size=1920x1080',
      // '--no-first-run',
      // '--no-zygote',
      // '--single-process', // <- this one doesn't works in Windows
      '--unlimited-storage',
      '--full-memory-crash-report',
    ];

    try {
      global.singleton_instance = await Cluster.launch({
        puppeteerOptions: {
          ignoreHTTPSErrors: true,
          headless: false,
          args
        },
        concurrency: Cluster.CONCURRENCY_BROWSER,
        maxConcurrency: process.env.CONCURRENCY || 1,
        monitor: true,
        timeout: 1.5 * 60 * 1000,
      });

      global.singleton_instance.on('taskerror', (e, data) => {
        console.log(`Error crawling ${data}: Error:${e.stack}`);
      });

    } catch (e) {
      console.log(e);
    }
  }

  if (global.singleton_instance === undefined) {
    throw new Error("Cluster Launch Error");
  }
  return global.singleton_instance;
}
module.exports = getInstance();