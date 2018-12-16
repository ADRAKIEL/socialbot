
// Dependencies
const puppeteer = require('../../node_modules/puppeteer');

// Settings
const sets = require ('../configs/app-settings.js');

// Imports
const service = require('./services/data-service.js');


// Global sets and vars
const facebook = 'https://facebook.com';
let enckey = '';


// The functons
let scrape = async () => {
	const firefox = 'firefox';
	const chrome = '/usr/bin/google-chrome-stable';
	const browser = await puppeteer.launch({
		headless: false,
		executablePath: chrome,
		args:sets.browser.puppet
	});
	const page = await browser.newPage();
	let res = {};

	try {
		sets.user = service.getData();

		let mailChain = service.decrypt(sets.user.mail, enckey);
		let passChain = service.decrypt(sets.user.pass, enckey);

		await page.setViewport({ width: sets.browser.w, height: sets.browser.h });
		console.info('facebook site accessed');
		await page.goto(facebook);
		await page.waitFor(5000);

	   // await page.click(sets.sel.mail);
	   await page.type(sets.sel.mail, mailChain, { delay: 1 });
	   await page.type(sets.sel.pass, passChain, { delay: 1 });
	   await page.waitFor(100);
	   await page.click(sets.sel.log);

	// Start Post Seccion
	// await page.waitFor(5000);
	sets.sel.post.text = service.getPostArea(page);
	console.info('post sets as ', sets.sel.post.text)
	await page.waitFor(100);
	//await page.click(sets.sel.post.text);


	res = sets;

	console.info('Ending App');

	return res;
} catch (e) {
	console.info('Error on main: ', e);
	return e;
} finally {
	console.info('closing');
	await page.waitFor(10000);
//        browser.close();
return res;
}

};


scrape().then((value) => {
	console.log(value); // Success!
});


