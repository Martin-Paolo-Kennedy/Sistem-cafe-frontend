// Services/Categoria.js

import axios from 'axios';

const API_URL = 'http://localhost:8090/url/usuario'; // Cambia esta URL según tu configuración

class UsuarioService {
    getAllUsuario(){
        return axios.get(API_URL);
    }
    createCategoria(usuario){
        return axios.post(`${API_URL}/registraUsuario`, usuario, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    updateUsuario(usuario){
        return axios.put(`${API_URL}/actualizaUsuario`, usuario, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    
    deleteUsuario(id){
        return axios.delete(`${API_URL}/eliminaUsuario/${id}`);
    }
};

export default new UsuarioService;
