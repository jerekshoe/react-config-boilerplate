import express from 'express';

// Create server
const app = express();

// Send files
app.use('/', express.static('dist'));

// If process port is assigned, use it; otherwise, use port 8080
app.listen(process.env.PORT || 8080);
