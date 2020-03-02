const express = require('express')
const app = express();
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')
const memorials = require('./data/memorials.json')

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get('/', (req, res) => {
    res.status(308)
    res.redirect('/api/docs')
})

app.get('/api/memorials/trees', (req, res) => {
    res.status(200)
    res.send(memorials.trees)
})

app.get('/api/memorials/trees/{id}', (req, res) => {
    res.status(200)
    res.send(getTreeById(req.params.id))
})

app.get('/api/memorials/benches', (req, res) => {
    res.status(200)
    res.send(memorials.benches)
})

app.get('/api/memorials/benches/{id}', (req, res) => {
    res.status(200)
    res.send(getBenchById(req.params.id))
})

app.listen(3000, () => console.log('Listening on port 3000...'));

function getTreeById(id){
    memorials.trees.forEach(tree => {
        if(tree.id == id){
            return tree
        }
    })
}

function getBenchById(id){
    memorials.benches.forEach(bench => {
        if(bench.id == id){
            return bench
        }
    })
}