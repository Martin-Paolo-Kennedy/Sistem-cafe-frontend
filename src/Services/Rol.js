// Services/Categoria.js

import axios from 'axios';

const API_URL = 'http://localhost:8090/url/rol'; // Cambia esta URL según tu configuración

class RolService {
    getAllRol(){
        return axios.get(API_URL);
    }
    
};

export default new RolService;
