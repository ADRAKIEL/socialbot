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
	getPostArea: function(page){
		let post = '';
		let elements = '//*[@id="js_e"]';

		console.info('Post retrive: ', post);
		console.info('====', elements);
		return 'textarea'; //post[0].id;
	},
	encrypt: function(data, key){
		let textenc = '';

		try{
			let bytes  = CrytptoJS.AES.encrypt(data, key);
			textenc = bytes.toString();
		} catch (e){
			console.info(e);
			textenc = 'Error ' + e;
		}

		return textenc.toString();
	},
	decrypt: function(data, key){
		let chain = CrytptoJS.AES.decrypt(data, enckey);
		return chain.toString(CrytptoJS.enc.Utf8);
	}
}

