const express = require('express');
const { swaggerUi, specs } = require('./swagger');

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Routes
app.use("/", require('./routes/index'));

// Swagger documentation
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Web Server is listening at port ${PORT}`);
});