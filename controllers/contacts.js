const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb
    .getDb()
    .db("contacts")
    .collection("contacts")
    .find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("contacts")
    .collection("contacts")
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.json(lists[0]);
  });
};

const createContact = async (req, res, next) => {
  try {
    const _db = mongodb.getDb().db("contacts");
    const contacts = _db.collection("contacts");
    const newContact = req.body;

    const result = await contacts.insertOne(newContact);

    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    res.status(201).json(newContact);
  } finally {
    await mongodb.close;
  }
};

const updateContact = async (req, res, next) => {
  try {
    const _db =  mongodb.getDb().db("contacts");
    const contacts = _db.collection("contacts");
    const userId = new ObjectId(req.params.id);

    const query = { _id: userId };

    const updateDoc = {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
      }
    }

    const options = {
      upsert: false
    }

    const result = await contacts.updateOne(query, updateDoc, options);
    console.log(`${result.matchedCount} documents matched the query, updated ${result.modifiedCount} document(s)`);
    res.status(204).json();
  } finally {
    await mongodb.close;
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const _db =  mongodb.getDb().db("contacts");
    const contacts = _db.collection("contacts");
    const userId = new ObjectId(req.params.id);

    const query = { _id: userId };

    const result = await contacts.deleteOne(query);
    if(result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
      res.status(200).json();
    } else {
      console.log("No documents matched the query. Deleted 0 documents");
    }
    
  } finally {
    await mongodb.close;
  }
}

module.exports = { getAll, getSingle, createContact, updateContact, deleteContact };
