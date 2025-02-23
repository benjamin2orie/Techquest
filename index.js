
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import dbConnection from './src/model/db.connection.js';
import router from './src/views/router.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from './swagger.json' assert {type: 'json'};


dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
app.use(express.json());

// CORS handling

app.use(cors({
    oringin: '*',
    methods: 'GET,POST',
    allowedHeaders: ['Content-Type', 'Authorization'],
}))


const swaggerDocument = JSON.parse(fs.readFileSync(__dirname + '/swagger.json', 'utf8'));

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const port = process.env.PORT || 3000;

// Swagger UI setup
if (swaggerDocument) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} else {
    console.error('Swagger document could not be loaded.');
}
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res)=>{
    res.send("welcome")
})
app.use('/api/v1', router)


app.listen(port, () =>{
    console.log(`Server is running on port ${port}`)
    dbConnection()
    
});

export default app;
  