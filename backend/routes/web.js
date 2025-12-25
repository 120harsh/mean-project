import express from 'express';
import { addUser, loginUser } from '../controllers/web.js';
// import addUser from '../controllers/web.js';
const webRoutes = express.Router();
webRoutes.route('/sign-in').post(addUser);
webRoutes.route('/login').post(loginUser);
export default webRoutes;
