const puppeteer = require('puppeteer'),
    dayjs = require('dayjs'),
    CronJob = require('node-cron')

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

let printReport = async () => {
    const browser = await puppeteer.launch({
        // ignoreDefaultArgs: ['--disable-extensions'],
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        // headless: true
    });
    const page = await browser.newPage();

    await page.setViewport({ width: 1024, height: 768, deviceScaleFactor: 1 });
    //TODO: update to current month
    await page.goto('http://django:8000/tracker/rifoti/' + dayjs().subtract(1, 'month').format('YYYY-MM'), { waitUntil: "load" });
    // await page.waitForNavigation({waitUntil: "load", timeout: 600000});

    var innerHeight = await page.evaluate(_ => { return window.innerHeight }),
        height = await page.evaluate(_ => { return document.body.clientHeight });

    // console.log(height);
    // console.log("Scrolling");

    for (i = 0; i < (height / innerHeight); i++) {
        page.evaluate(_ => {
            window.scrollBy(0, window.innerHeight);
        });
        await sleep(200);
        // console.log(i);
    }

    console.log("Waiting for transfers");

    await page.waitForSelector('#thetracker'); //.waitForNavigation({ timeout: 15000, waitUntil: 'networkidle2' });

    // console.log("Done.");
    var height = await page.evaluate(() => {
        $('.show-more').click()
        $('#filters, .timeline-controls, .fa-external-link-alt, .dz-footer, .dz-header').hide()
        return document.body.clientHeight;
    });

    //TODO: update to current month
    let rptname = `report_${dayjs().subtract(1, 'month').format('MMMYYYY')}.pdf` //_${dayjs().unix()}

    await page.pdf({ path: `./reports/${rptname}`, width: "1280px", height: height + "px", printBackground: true });
    browser.close();
    console.log('Reporting service finished', dayjs().format('YYYY-MM-DD hh:mm:ss A'));
}
// )();

var task = CronJob.schedule('1 12,15,18 2 * *', function () {
    console.log('Reporting service started', dayjs().format('YYYY-MM-DD hh:mm:ss A'));
    printReport();

});


try {
    task.start();
} catch (error) {
    console.error('tracker service catch err: ', error);
}