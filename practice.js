const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017/street-fighters'
const Character = require('./models/Character')

mongoose.connect(url, { useNewUrlParser: true })

async function runCode() {
    const doc = await Character.findOneAndUpdate(
        { name: 'gayeon' },
        {
          specials: [
            'kindness',
            'curiosity',
            'pure'
          ]
        })
      
      console.log(doc)
}

runCode()
    .catch(error => { console.error(error) })




