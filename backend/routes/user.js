import express from 'express';
import {allConversations, allUserRequestStatus, allUsers} from '../controllers/user.js';
import { verifyWebToken } from '../auth/authtoken.js';
const userRoutes = express.Router();
userRoutes.route('/all-users').post(verifyWebToken,allUsers);
userRoutes.route('/all-user-request-status').post(verifyWebToken,allUserRequestStatus);
userRoutes.route('/conversation').post(verifyWebToken,allConversations);




export default userRoutes;