
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import dbConnection from './src/model/db.connection.js';
import router from './src/views/router.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert {type: 'json'};

dotenv.config();


const app = express();
app.use(express.json());

// CORS handling

app.use(cors({
    oringin: '*',
    methods: 'GET,POST',
    allowedHeaders: ['Content-Type', 'Authorization'],
}))

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const port = process.env.PORT || 3000;

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1', router)


app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
    dbConnection()
    
});

export default app;
  