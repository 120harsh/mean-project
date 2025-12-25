import db from "../database-connection.js";
import {response} from "../shared/response.js";

const allUsers = async (req, res) => {
    // const sql = "SELECT req.status,req.recieved_id,req.sender_id,us.full_name,us.id,us.email,us.age,us.profile,us.mobile_no,us.dob FROM users AS us LEFT JOIN user_friend_request_status AS req ON us.id= req.recieved_id";
    const sql = "SELECT full_name,email,id,mobile_no,age from users where id!= "+req.body.id;
    db.query(sql, (err, results) => {
        if (err) {
            return response(err, 500, [], err.message);
        }
        return response(res, 200, results, 'Users fetched successfully');
    });
};

const allUserRequestStatus = async(req,res)=>{
     const sql = "SELECT * from user_friend_request_status where sender_id= "+req.body.id+ " OR recieved_id = "+req.body.id;
      db.query(sql, (err, results) => {
        if (err) {
            return response(err, 500, [], err.message);
        }
        return response(res, 200, results, 'Users fetched successfully');
    })};

    const allConversations = async(req,res)=>{
        console.log(req.body);
     const sql = "SELECT * from conversation where sender_id= "+req.body.senderId+ " OR recieved_id = "+req.body.recieverId;
      db.query(sql, (err, results) => {
        if (err) {
            return response(err, 500, [], err.message);
        }
        return response(res, 200, results, 'Users fetched successfully');
    })
    //  return response(res, 200, [], 'Users fetched successfully');

};

export  {allUsers,allUserRequestStatus,allConversations};