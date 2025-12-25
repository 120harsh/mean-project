import { createWebToken, verifyWebToken } from "../auth/authtoken.js";
import db from "../database-connection.js";
import {response} from "../shared/response.js";

async function addUser(req, res) {
    const sql = "INSERT INTO users (`full_name`, `email`, `age`, `profile`, `description`, `address`, `mobile_no`, `dob`, `password`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    if(!req.body.full_name?.trim() || !req.body.email.trim() || !req.body.age.trim() || !req.body.profile.trim() || !req.body.address.trim() || !req.body.mobile_no.trim() || !req.body.dob.trim() || !req.body.password.trim()){
        return response(res, 400, [],false, 'All fields are required');
    }
    verifyWebToken({ email: req.h });
    const payload = [
        req.body.full_name,
        req.body.email,
        req.body.age,
        req.body.profile,
        req.body.description,
        req.body.address,
        req.body.mobile_no,
        req.body.dob,
        req.body.password,
    ];
       const columns = "email = ? OR mobile_no = ?";
       const values = [req.body.email,req.body.mobile_no]; 
       const status = await checkfieldsValue(columns,values);
       
        if (status) {
            return response(res, 409, [],false, 'User already exists');
        }else{
            

       db.query(sql, payload, (err, results) => {
        if (err) {
            return response(res, 500, [], err.message);
        }
        return response(res, 200, results.body,true, 'User added successfully');
        
    // });
});
        }
};

async function checkfieldsValue (columns , values){
    return new Promise((resolve, reject) => {
         db.query('SELECT COUNT(*) AS count FROM users WHERE '+ columns, values, (err, results) => {
        if (err) {
            reject(err);
        }
        if (results[0].count > 0) {
            resolve(true);
        } else {
            resolve(false);
        }
    });
    });
}


async function loginUser (req, res) {  
    
    // const status = await checkfieldsValue(columns,values);
    const sql = 'SELECT email,full_name,id from users where  email = "'+ req.body.email +'" AND password = "'+req.body.password+'"';
     db.query(sql, async (err, results) => { 
         if(results){
        const token = await createWebToken({ email: req.body.email });
        const resp = {
            token : token,
            details:results
        }
        return response(res, 200, resp,true, 'Login successful');
    }else{
        return response(res, 401, [],false, 'Invalid credentials');
    }

    })

}


export {addUser, loginUser};