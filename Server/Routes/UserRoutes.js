import { getUSERdata } from "../controler/Usercontroller.js";
import userauth from "../Middlewear/userauth.js";
import express from 'express';

 const UserRoutes = express.Router();

UserRoutes.get('/data',userauth ,getUSERdata );

export default UserRoutes;