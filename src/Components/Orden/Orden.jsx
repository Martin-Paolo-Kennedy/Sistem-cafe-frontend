import React, { useEffect, useState } from 'react';
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from '@mui/material';

// Mock API functions (deberías reemplazar estos con tus llamadas reales a la API)
const fetchOrders = async () => {
    // Reemplaza con tu API para obtener pedidos
    return [
        { id: 1, fecha: '2024-09-28', cliente: 'Cliente A', total: 150.00 },
        { id: 2, fecha: '2024-09-29', cliente: 'Cliente B', total: 200.00 },
    ];
};

const Ordenes = () => {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Cargar los pedidos al montar el componente
    useEffect(() => {
        const loadOrders = async () => {
            const data = await fetchOrders();
            setOrders(data);
        };

        loadOrders();
    }, []);

    // Abrir el modal para ver detalles del pedido
    const handleOpen = (order) => {
        setSelectedOrder(order);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedOrder(null);
    };

    // Cambiar página de la tabla
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Cambiar número de filas por página
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Container>
            <h1>Órdenes</h1>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID Pedido</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Cliente</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.fecha}</TableCell>
                                <TableCell>{order.cliente}</TableCell>
                                <TableCell>${order.total.toFixed(2)}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => handleOpen(order)}>
                                        Ver Detalles
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={orders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Detalles del Pedido</DialogTitle>
                <DialogContent>
                    {selectedOrder && (
                        <div>
                            <Typography variant="h6">ID Pedido: {selectedOrder.id}</Typography>
                            <Typography>Fecha: {selectedOrder.fecha}</Typography>
                            <Typography>Cliente: {selectedOrder.cliente}</Typography>
                            <Typography>Total: ${selectedOrder.total.toFixed(2)}</Typography>
                            {/* Aquí puedes añadir más detalles del pedido si los tienes */}
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Ordenes;
