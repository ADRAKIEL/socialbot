// Dependencies
const puppeteer = require('../node_modules/puppeteer');
const CrtptoJS = require('crypto-js');

// My Sims
const simmail = 'ismaelme@live.com';
const simpass = 'HolaFaceBook13.';
const simenckey = '147';

// Global sets and vars
const facebook = 'https://facebook.com';
let enckey = '';
let sets = {
	'browser': {
		'w': 1080,
		'h': 800,
		'puppet' : ['%U','--disable-infobars','--disable-notifications']
	},
	'user': {
		'mail': '',
		'pass': ''
	},
	'sel': {
		'mail': '#email',
		'pass': '#pass',
		'log': '#u_0_2',
		'post': {
			'text': ''
		}
	}
};

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
	getData();
	let mailChain = CrtptoJS.AES.decrypt(sets.user.mail, enckey);
	let passChain = CrtptoJS.AES.decrypt(sets.user.pass, enckey);

        await page.setViewport({ width: sets.browser.w, height: sets.browser.h });
        console.info('facebook site accessed');
        await page.goto(facebook);
        await page.waitFor(5000);

       // await page.click(sets.sel.mail);
        await page.type(sets.sel.mail, mailChain.toString(CrtptoJS.enc.Utf8), { delay: 1 });
        await page.type(sets.sel.pass, passChain.toString(CrtptoJS.enc.Utf8), { delay: 1 });
	await page.waitFor(100);
	await page.click(sets.sel.log);

	// Start Post Seccion
	// await page.waitFor(5000);
	sets.sel.post.text = getPostArea(page);
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
        browser.close();
        return res;
    }

};

function getData(){
	let cyphertext = '';

	enckey = simenckey;

	console.info('key sets as ', '123-'+enckey+'aes');

	sets.user.mail = encrypt(simmail, enckey);
	sets.user.pass = encrypt(simpass, enckey);

	console.info('data retrived ', sets.user);
}

function getPostArea(page){
	let post = '';
	let elements = '//*[@id="js_e"]';

	console.info('Post retrive: ', post);
	console.info('====', elements);

	return 'textarea'; //post[0].id;
}

function encrypt(data, key){
	let textenc = '';

	try{
		let bytes  = CrtptoJS.AES.encrypt(data, key);
		textenc = bytes.toString();
	} catch (e){
		console.info(e);
		textenc = 'Error ' + e;
	}

	return textenc.toString();
}

scrape().then((value) => {
    console.log(value); // Success!
});


