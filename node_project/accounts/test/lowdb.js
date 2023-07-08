const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);


// db.defaults({ posts: [], users: {} }).write();

db.get('posts').unshift({ id: 1, title: 'the weather is ok~~' }).write();