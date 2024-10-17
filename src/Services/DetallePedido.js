// Services/Categoria.js

import axios from 'axios';

const API_URL = 'http://localhost:8090/url/pedidoDetalle'; // Cambia esta URL según tu configuración

class DetallePedidoService {
    getAllDetallePedido(){
        return axios.get(API_URL);
    }
    createDetallePedido(detallePedido){
        return axios.post(`${API_URL}/registraPedidoDetalle`, detallePedido, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    updateDetallePedido(detallePedido){
        return axios.put(`${API_URL}/actualizaPedidoDetalle`, detallePedido, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    
    deleteDetallePedido(id){
        return axios.delete(`${API_URL}/eliminaPedidoDetalle/${id}`);
    }
};

export default new DetallePedidoService;
