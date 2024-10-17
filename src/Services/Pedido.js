// Services/Categoria.js

import axios from 'axios';

const API_URL = 'http://localhost:8090/url/pedido'; // Cambia esta URL según tu configuración

class PedidoService {
    getAllPedido(){
        return axios.get(API_URL);
    }
    createPedido(pedido){
        return axios.post(`${API_URL}/registraPedido`, pedido, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    updatePedido(pedido){
        return axios.put(`${API_URL}/actualizaPedido`, pedido, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    
    deletePedido(id){
        return axios.delete(`${API_URL}/eliminaPedido/${id}`);
    }
};

export default new PedidoService;
