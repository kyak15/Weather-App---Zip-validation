import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import apiRoutes from './src/api/routes/routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors()); // handling CORS
app.use(bodyParser.json()); // parse JSON bodies

// api routes
app.use('/api', apiRoutes);

// error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
