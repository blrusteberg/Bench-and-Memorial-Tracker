const express = require('express')
const app = express();
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')
const memorials = require('./data/memorials.json')
const port = process.env.PORT || 1337;

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get('/', (req, res) => {
    res.status(308)
    res.redirect('/api/docs')
})

app.get('/api/memorials', (req, res) => {
    res.status(200)
    res.send(memorials)
})

app.get('/api/memorials/{id}', (req, res) => {
    res.status(200)
    res.send(getMemorialById(req.params.id))
})

app.get('/api/memorials/{type}', (req, res) => {
    res.status(200)
    res.send(getMemorialByType(req.params.type))
})

app.listen(port, () => console.log(`Listening on port ${port}...`));

function getMemorialById(id){
    memorials.memorials.forEach(memorial => {
        if(memorial.id == id){
            return bench
        }
    })
}

function getMemorialByType(type){
    memorials = []
    memorials.memorials.forEach(memorial => {
        if(memorial.type == type){
            memorials.push(memorial)
        }
    })
    return memorials
}