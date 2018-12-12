const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

const DB_NAME = 'javascript-mongodb-demo';
const COLLECTION_NAME = 'users';

async function clearDb(db) {
  console.log('------- clearDb --------');
  const collections = await db.collections();
  await Promise.all(collections.map(async it => {
    await it.drop();
  }));
}

async function createUsers(users) {
  console.log('------- createUsers --------');
  users.insertMany([
    {
      name: 'javascript',
      age: 10
    }, {
      name: 'mongodb',
      age: 20
    }
  ])
}

async function printUsers(users) {
  console.log('------- printUsers --------');
  await users.find().forEach(user => {
    console.log(user);
  })
}

async function updateUsers(users) {
  console.log('------- updateUsers --------');
  await users.updateOne({name: 'mongodb'}, {'$set': {name: 'mongodb', age: 200}})
}

async function deleteUsers(users) {
  console.log('------- deleteUsers --------');
  await users.deleteMany({})
}

async function run() {
  const mongo = await MongoClient.connect(url, {useNewUrlParser: true});
  const db = mongo.db(DB_NAME);

  await clearDb(db);

  const users = await db.createCollection(COLLECTION_NAME);

  await createUsers(users);

  await printUsers(users);

  await updateUsers(users);

  await printUsers(users);

  await deleteUsers(users);
  
  await printUsers(users);

  await mongo.close()
}

run();
