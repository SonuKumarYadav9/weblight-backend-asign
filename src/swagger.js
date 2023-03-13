const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'WEBLIGHT_BACKEND_ASSIGNMENT',
      version: '1.0.1',
      description: 'WEBLIGHT API DOCUMENTATION'
    },
    servers: [
      {
        url: 'http://localhost:5000/'
      }
    ]
  },
  apis: ['./src/routes/route.js']
};

const specs = swaggerJsdoc(options);

module.exports = app => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

