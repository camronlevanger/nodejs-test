const path = require('path');
const faker = require('faker');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');


const NUMBER_OF_MEMBERS = 1000;


class Generate {
	async _createTables(db) {
		await db.exec(`CREATE TABLE IF NOT EXISTS members
			(
				id TEXT,
				firstName TEXT,
				lastName TEXT,
				title TEXT,
				phone TEXT,
				company TEXT,
				department TEXT,
				url TEXT,
				image TEXT
			)`);

		await db.exec(`CREATE TABLE IF NOT EXISTS addresses
			(
				id TEXT,
				memberId TEXT,
				primaryAddress INTEGER,
				address TEXT,
				city TEXT,
				state TEXT,
				zip TEXT
			)`);
	}


	async _insert(table, obj) {
		let keys = Object.keys(obj);
		let values = [];
		let placeHolders = [];
		for (let key of keys) {
			values.push(obj[key]);
			placeHolders.push('?');
		}

		let db = await this.getDb();

		await db.run(
			  `INSERT INTO ${table} (${keys.join(',')}) VALUES(${placeHolders.join(',')})`,
			  values
			);
	}


	async getDb() {
		if (!this._db) {
			this._db = await open({
			      filename: path.join(__dirname, 'sqlitedb'),
			      driver: sqlite3.Database
			    });

		    await this._createTables(this._db);
		}

		return this._db;
	}


	async run() {
		let db = await this.getDb();

		for (let i = 1; i <= NUMBER_OF_MEMBERS; i++) {
			if (i % 100 === 0) {
				console.log(`${i} of ${NUMBER_OF_MEMBERS}`);
			}

			let member = {
				id: faker.datatype.uuid(),
				firstName: faker.name.firstName(),
				lastName: faker.name.lastName(),
				title: faker.name.title(),
				phone: faker.phone.phoneNumber(),
				company: faker.company.companyName(),
				department: faker.commerce.department(),
				url: faker.internet.url(),
				image: faker.image.imageUrl()
			};

			await this._insert('members', member);

			let numAddresses = Math.floor(Math.random() * 3 + 1);
			for (let j = 0; j < numAddresses; j++) {
				let address = {
					id: faker.datatype.uuid(),
					primaryAddress: j === 0 ? 1 : 0,
					memberId: member.id,
					address: faker.address.streetAddress(),
					city: faker.address.city(),
					state: faker.address.stateAbbr(),
					zip: faker.address.zipCode()
				};

				await this._insert('addresses', address);
			}
		}
	}
}

const generate = new Generate();
generate.run().then(function() {
	console.log('Finished generating data.');
},
function(err) {
	throw err;
});
