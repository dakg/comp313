import axios from 'axios';
import http from "http"; 

const API= axios.create({ baseURL: 'http://localhost:5000/api/users',headers: {
    "Content-type": "application/json"} });

const getAllUsers = () => {
    return API.get("/userList");
};
export default {
    getAllUsers
};