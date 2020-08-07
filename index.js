const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient

let url = 'mongodb+srv://B:123321@cluster0.axyta.mongodb.net/star wars?retryWrites=true&w=majority'

MongoClient.connect(url, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('music_app')
        const pmc_collection = db.collection('pop_music_chart')

        app.set('views', './views')
        app.set('view engine', 'pug')
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(express.static('public'))
        app.use(bodyParser.json())

        app.get('/', function (req, res) {
            db.collection('pop_music_chart').find().toArray()
                .then(results => {
                    res.render('index.pug', { target: results })
                })
                .catch(error => console.error(error))

        })

        app.post('/create', (req, res) => {
            let temp = {
                title: req.body.title,
                artist: req.body.artist,
                like: 0
            }

            pmc_collection.insertOne(temp)
                .then(result => {
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })

        app.post('/search_title', (req, res) => {
            db.collection('pop_music_chart').find({ title: req.body.title }).toArray()
                .then(results => {
                    res.render('index.pug', { target: results })
                })
                .catch(error => console.error(error))
        })

        app.post('/search_artist', (req, res) => {
            db.collection('pop_music_chart').find({ artist: req.body.artist }).toArray()
                .then(results => {
                    res.render('index.pug', { target: results })
                })
                .catch(error => console.error(error))
        })

        app.post('/like', (req, res) => {
            pmc_collection.findOne(
                {
                    title: req.body.title
                })
                .then(results => {
                    pmc_collection.updateOne({
                        title: req.body.title
                    }, {
                        $set: {
                            like: ++results.like
                        }
                    })
                        .then(result => {
                            res.redirect('/')
                        })
                        .catch(error => console.error(error))
                })
                .catch(error => console.error(error))
        })

        app.post('/delete', (req, res) => {
            pmc_collection.deleteOne(
                { title: req.body.title }
            )
                .then(result => {
                    if (result.deletedCount === 0) {
                        return res.json('No music to delete')
                    }
                    res.json(req.body.title + ` Deleted`)
                })
                .catch(error => console.error(error))
        })

        app.listen(3000, function () {
            console.log('listening on 3000')
        })
    })
    .catch(error => console.error(error))

