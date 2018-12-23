const sim = require ('./sim.js');
const CrytptoJS = require('crypto-js');

let	user = {
	'mail': '',
	'pass': ''
};

module.exports = {
	getData: function(){
		let cyphertext = '';

		enckey = sim.enckey;

		console.info('key sets as ', '123-' + enckey + 'aes');

		user.mail = this.encrypt(sim.mail, enckey);
		user.pass = this.encrypt(sim.pass, enckey);

		console.info('data retrived ', user);
		return user;
	},
	getPostArea: async function(page){
		let elements = '';

		try{
			await page.waitForSelector('textarea', { timeout: 200 });

			elements = await page.evaluate(() => document.querySelector('textarea'));
		} catch (e) {
			console.info('Error on getPostArea: ', e.message);
		} finally {
			console.info('Finally getPostArea.');
		}
		return elements;
	},
	encrypt: function(data, key){
		let textenc = '';

		try{
			let bytes  = CrytptoJS.AES.encrypt(data, key);
			textenc = bytes.toString();
		} catch (e){
			console.info(e.message);
			textenc = 'ErrorEnc';
		}

		return textenc.toString();
	},
	decrypt: function(data, key){
		let textdec = '';
		
		try{
			let chain = CrytptoJS.AES.decrypt(data, enckey);
			textdec = chain.toString(CrytptoJS.enc.Utf8);
		} catch (e){
			console.info(e.message);
			textdec = 'ErrorDec';
		}
		return textdec;
	}
}

