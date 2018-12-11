const puppeteer = require('../node_modules/puppeteer');
const facebook = 'https://facebook.com';
const sets = {
	'user': {
		'mail': 'ismaelme@live.com',
		'pass': 'HolaFaceBook13#'
	},
	'sel': {
		'mail': '#email',
		'pass': '#pass',
		'log': '#u_0_2'
	}
};

let scrape = async () => {
    const firefox = 'firefox';
    const chrome = '/usr/bin/google-chrome-stable';
    const browser = await puppeteer.launch({headless: false, 
                            executablePath: chrome,
                            args: ['%U','--disable-infobars']});
    const page = await browser.newPage();
    let res = {};

    try {
        await page.setViewport({ width: 960, height: 800 });
        console.info('facebook site accessed');
        await page.goto(facebook);
        await page.waitFor(5000);
        await page.click(sets.sel.mail);
        await page.type(sets.sel.mail, sets.user.mail, { delay: 1 });
        await page.type(sets.sel.pass, sets.user.pass, { delay: 1 });
	await page.click(sets.sel.log);


        res = sets;

        console.info('Ending App');

        return res;
    } catch (e) {
        console.info(e);
        return e;
    } finally {
        console.info('closing');
        await page.waitFor(20000);
        //browser.close();
        return res;
    }

};

scrape().then((value) => {
    console.log(value); // Success!
});
