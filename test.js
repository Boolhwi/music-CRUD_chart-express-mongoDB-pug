const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient

let url = 'mongodb+srv://B:123321@cluster0.axyta.mongodb.net/star wars?retryWrites=true&w=majority'

MongoClient.connect(url, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('a')
        const quotesCollection = db.collection('b')

        app.set('views', './views')
        app.set('view engine', 'pug')
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(express.static('public'))
        app.use(bodyParser.json())

        app.get('/', function (req, res) {
            db.collection('b').find().toArray()
                .then(results => {
                    res.render('test.pug', { quotes: results })
                })
                .catch(error => console.error(error))

        })

        app.post('/quotes', (req, res) => {
            quotesCollection.insertOne(req.body)
                .then(result => {
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })

        app.put('/quotes', (req, res) => {
            quotesCollection.findOneAndUpdate(
                { name: 'harry' },
                {
                    $set: {
                        name: req.body.name,
                        quote: req.body.quote
                    }
                },
                {
                    upsert: true
                }
            )
                .then(result => {
                    res.json(result)
                })
                .catch(error => console.error(error))
        })

        app.delete('/quotes', (req, res) => {
            quotesCollection.deleteOne(
                { name: req.body.name }
            )
                .then(result => {
                    if (result.deletedCount === 0) {
                        return res.json('No quote to delete')
                    }
                    res.json(`Deleted Darth Vadar's quote`)
                })
                .catch(error => console.error(error))
        })

        app.listen(3000, function () {
            console.log('listening on 3000')
        })
    })
    .catch(console.error)