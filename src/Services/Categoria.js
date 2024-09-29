// Services/Categoria.js

import axios from 'axios';

const API_URL = 'http://localhost:8090/url/categoria'; // Cambia esta URL según tu configuración

class CategoriaService {
    getAllCategorias(){
        return axios.get(API_URL);
    }
    createCategoria(categoria){
        return axios.post(`${API_URL}/registraCategoria`, categoria, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    updateCategoria(categoria){
        return axios.put(`${API_URL}/actualizaCategoria`, categoria, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    
    deleteCategoria(id){
        return axios.delete(`${API_URL}/eliminaCategoria/${id}`);
    }
};

export default new CategoriaService;
