const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const morgan = require("morgan");
const logger = require("./config/logger")
const userRoutes = require("./routes/userRoutes");
const searchRoutes = require("./routes/searchRoutes")
const db = require("./models");
const app = express();


// Morgan setup to use Winston
app.use(
  morgan("combined", { stream: { write: (message) => logger.info(message) } })
);

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Swagger definition
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Phone Directory API',
        version: '1.0.0',
        description: 'This is a REST API application made with Express. It retrieves data from a phone directory.',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        },
    ],
};
// Options for the swagger docs
const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./routes/*.js', './models/*.js'],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);
// Use swagger-ui-express for your app's documentation endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


db.sequelize
  .sync({ force: true }) 
  .then(() => {
    console.log("Drop and re-sync db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// Routes
app.use("/api/users", userRoutes);
app.use("/api/search", searchRoutes);

// Error handling
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
