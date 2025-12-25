import jwt from 'jsonwebtoken';
import { response } from '../shared/response.js';

const defaultSecret = 'meanproject'; // You can set your secret here

function createWebToken(payload, secret = defaultSecret, options = {expiresIn: '1d'}) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, options, (err, token) => {
            if (err) {
                return reject(err);
            }
            resolve(token);
        });
    });
}


const verifyWebToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]; // format: "Bearer <token>"
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return response(res, 401, [], 'Access Denied. No token provided.');
  }


const secret = defaultSecret; // Use the same secret as in createWebToken
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return response(res, 403, [], 'Invalid or expired token.');
            }
            req.h = decoded;
             next();
          
        });
   
};

export { createWebToken,verifyWebToken };