const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'CSE-341 API',
        description: 'An API built for the class CSE 341: Web Backend Development II. It involves CRUD operations on a MongoDB collection of contacts.'
    },
    host: 'localhost:8080',
    schemes: ['http']
}

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);