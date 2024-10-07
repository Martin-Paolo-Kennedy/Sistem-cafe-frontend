// Services/Categoria.js

import axios from 'axios';

const API_URL = 'http://localhost:8090/url/producto'; // Cambia esta URL según tu configuración

class ProdcutoService {
    getAllProducto(){
        return axios.get(API_URL);
    }
    createCliente(producto){
        return axios.post(`${API_URL}/registraProducto`, producto, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    updateProducto(producto){
        return axios.put(`${API_URL}/actualizaProducto`, producto, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    
    deleteProdcuto(id){
        return axios.delete(`${API_URL}/eliminaProducto/${id}`);
    }
};

export default new ProdcutoService;
