const faker = require('faker');

let memorials = [];
let id, type, donater, latitude, longitude;

let types = [
    "tree",
    "bench",
    "flag pole",
    "artifact",
    "art"
];

// generate fake data
for(let i=0; i<5; i++){

    id = i;
    type = types[Math.floor(Math.random()*types.length)];
    donater = faker.name.findName();
    // latitude and longitude picked from four corners of Edwardsville for range
    latitude = faker.random.number({min:38.782784, max:38.807985, precision: 0.000001});
    longitude = faker.random.number({min:-90.020638, max:-89.926522, precision: 0.000001});

    memorials[i] = {id, type, donater, latitude, longitude};
}

memorials = {memorials}

// create memorials.json file
let memString = JSON.stringify(memorials);
let fs = require('fs');
fs.writeFile("api/data/memorials.json", memString, function(err, result) {
    if(err) console.log('error', err);
});