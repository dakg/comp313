import axios from 'axios';
import http from "http"; 

const API= axios.create({ baseURL: 'http://localhost:5000/api',headers: {
    "Content-type": "application/json"} });

const getAllLaptops = () => {
    return API.get("/laptops");
};

const addLaptop = () => {
    return API.post("/addLaptop");
}

const searchLaptops = (searchQuery) => {
    return API.get(`/laptops/search?searchQuery=${searchQuery}`);
};

const getAllSpecs =() => {
    return API.get("/specs");
};

const getLastQuote =() =>{
    return API.get('/quotations/customization')
};
const getAllUsers = () => {
    return API.get("/userList");
};
export default {
    searchLaptops,
    getAllLaptops,
    getAllSpecs,
    addLaptop,
    getLastQuote,
    getAllUsers
};
