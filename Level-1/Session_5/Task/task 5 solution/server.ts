
import express from 'express'
import {router} from './Routes/microbus-routes'

const app = express();

app.use(express.json());
app.use('/fleet' , router);

const PORT = 3000;

app.listen(PORT , ()=>{
    console.log(`lestening to port: ${PORT}`);
})