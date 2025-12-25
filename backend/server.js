import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.js';
import { response } from './shared/response.js';
import webRoutes from './routes/web.js';



const app = express();

dotenv.config({ override: true });
app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/web', webRoutes);
app.use((req, res, next) => {
   response(res, 404, [], 'Bad Request');
});


app.listen(process.env.PORT, () => {
  console.log('Server is running on port', process.env.PORT);
});
// import userRoutes from './routes/users.js';