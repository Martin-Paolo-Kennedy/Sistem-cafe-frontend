// Services/Categoria.js

import axios from 'axios';

const API_URL = 'http://localhost:8090/url/proveedor'; // Cambia esta URL según tu configuración

class ProveedorService {
    getAllProveedor(){
        return axios.get(API_URL);
    }
    createProveedor(proveedor){
        return axios.post(`${API_URL}/registraProveedor`, proveedor, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    updateProducto(proveedor){
        return axios.put(`${API_URL}/actualizaProveedor`, proveedor, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    
    deleteProducto(id){
        return axios.delete(`${API_URL}/eliminaProveedor/${id}`);
    }
};

export default new ProveedorService;
