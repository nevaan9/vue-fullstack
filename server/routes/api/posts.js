const express = require('express');
const mongoDB = require('mongodb');

const router = express.Router();

// LoadCollection Function
async function loadPostCollection () {
    const client = await mongoDB.MongoClient.connect('mongodb://nev:wwwww1@ds015892.mlab.com:15892/vue_express', {
        useNewUrlParser: true
    });

    return client.db('vue_express').collection('posts');
}

// GET posts
router.get('/', async (req, res) => {
    const posts = await loadPostCollection();
    res.send(await posts.find({}).toArray());
});

// POST posts
router.post('/', async (req, res) => {
    const posts = await loadPostCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date().getTime()
    });
    res.sendStatus(200);
});

// DELETE posts
router.delete('/:id', async (req, res) => {
    const posts = await loadPostCollection();
    await posts.deleteOne({
        _id: new mongoDB.ObjectID(req.params.id)
    });
    res.sendStatus(200);
});

module.exports = router;