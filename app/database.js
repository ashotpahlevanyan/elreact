import idb from 'idb';

const database = idb.open('jetsetter', 1, upgradeDb => {
	upgradeDb.createObjectStore('items', {
		keyPath: 'id',
		autoIncrement: true
	})
});

export default {
	getAll() {
		return database.then(db => {
			return db.transaction('items')
				.objectStore('items')
				.getAll();
		});
	},

	addItem(item) {
		return database.then(db => {
			const tx = db.transaction('items', 'readwrite');
			tx.objectStore('items').add(item);
			return tx.complete;
		});
	},
	updateItem(item) {
		return database.then(db => {
			const tx = db.transaction('items', 'readwrite');
			tx.objectStore('items').put(item);
			return tx.complete;
		});
	},
	markAllAsUnpacked() {
		return this.getAll()
			.then(items => items.map(item => ({...item, packed: false})))
			.then(items => {
				return database.then(db => {
					const tx = db.transaction('items', 'readwrite');
					for (const item of items) {
						tx.objectStore('items').put(item);
					}
					return tx.complete;
				});
			});
	},
	deleteItem(item) {
		return database.then(db => {
			const tx = db.transaction('items', 'readwrite');
			tx.objectStore('items').delete(item.id);
			return tx.complete;
		});
	},
	deleteUnpackedItems() {
		return this.getAll()
			.then(items => items.map(item => !item.packed))
			.then(items => {
				return database.then(db => {
					const tx = db.transaction('items', 'readwrite');
					for(const item of items) {
						tx.objectStore('items').delete(item.id);
					}
					return tx.complete;
				});
			});
	}
};

//
// import 'sqlite3';
// import knex from 'knex';
// import * as path from 'path';
// import { remote } from 'electron';
// const app = remote.app;
//
// const database = knex({
// 	client: 'sqlite3',
// 	connection: {
// 		filename: path.join(
// 			app.getPath('userData'),
// 			'jetsetter-items.sqlite'
// 		)
// 	},
// 	useNullAsDefault: true
// });
//
//
// database.schema.hasTable('items').then(exists => {
// 	if(!exists) {
// 		return database.schema.createTable('items', t => {
// 			t.increments('id').primary();
// 			t.string('value', 100);
// 			t.boolean('packed');
// 		});
// 	}
// });

//export default database;