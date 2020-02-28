const express = require('express')
const app = express();

var memorials = require('./data/memorials.json')

app.get('/', (req, res) => {
    res.send('Welcome to Edwardsville Memorial Tracker!')
});

app.get('/api/memorials/trees', (req, res) => {
    res.send(memorials.trees)
});

app.get('/api/memorials/benches', (req, res) => {
    res.send(memorials.benches)
})

app.listen(3000, () => console.log('Listening on port 3000...'));