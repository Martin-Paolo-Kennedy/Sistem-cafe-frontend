// Services/Categoria.js

import axios from 'axios';

const API_URL = 'http://localhost:8090/url/cliente'; // Cambia esta URL según tu configuración

class ClienteService {
    getAllCliente(){
        return axios.get(API_URL);
    }
    createCliente(cliente){
        return axios.post(`${API_URL}/registraCliente`, cliente, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    updateCliente(cliente){
        return axios.put(`${API_URL}/actualizaCliente`, cliente, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    
    deleteCliente(id){
        return axios.delete(`${API_URL}/eliminaCliente/${id}`);
    }
};

export default new ClienteService;
