import express from 'express';
import { router } from './routes/login-sigunup-routes.js';
import cookieParser from 'cookie-parser';
import { configDotenv } from 'dotenv';
configDotenv();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/auth', router);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('lestening to port, ', port);
});
//# sourceMappingURL=server.js.map