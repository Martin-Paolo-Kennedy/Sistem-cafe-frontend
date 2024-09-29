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
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ClienteService from '../../Services/Cliente'; // Importamos el servicio correcto

const Cliente = () => {
    const [clientes, setClientes] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentCliente, setCurrentCliente] = useState({
        idCliente: '',
        nombreCliente: '',
        emailCliente: '',
        mensaje: '',
        telefonoCliente: ''
    });

    // Cargar los clientes al montar el componente
    useEffect(() => {
        const loadClientes = async () => {
            const response = await ClienteService.getAllCliente(); // Corregimos la función del servicio
            setClientes(response.data); // Asumiendo que la respuesta tiene la data en 'data'
        };

        loadClientes();
    }, []);

    // Abrir el modal de agregar/editar cliente
    const handleOpen = (cliente = {
        idCliente: '',
        nombreCliente: '',
        emailCliente: '',
        mensaje: '',
        telefonoCliente: ''
    }) => {
        setCurrentCliente(cliente);
        setEditMode(!!cliente.idCliente); // Modo de edición si el cliente tiene ID
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentCliente({
            idCliente: '',
            nombreCliente: '',
            emailCliente: '',
            mensaje: '',
            telefonoCliente: ''
        });
        setEditMode(false);
    };

    // Guardar cambios o crear nuevo cliente
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (editMode) {
            await ClienteService.updateCliente(currentCliente); // Corregimos la función del servicio
        } else {
            await ClienteService.createCliente(currentCliente); // Corregimos la función del servicio
        }
        handleClose();
        const response = await ClienteService.getAllCliente(); // Recargamos la lista
        setClientes(response.data);
    };

    // Eliminar cliente
    const handleDelete = async (idCliente) => {
        await ClienteService.deleteCliente(idCliente); // Corregimos la función del servicio
        const response = await ClienteService.getAllCliente(); // Recargamos la lista
        setClientes(response.data);
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
            <h1>Clientes</h1>
            <Button variant="contained" color="primary" onClick={() => handleOpen()}>
                Agregar Cliente
            </Button>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID Cliente</TableCell>
                            <TableCell>Nombre Cliente</TableCell>
                            <TableCell>Email Cliente</TableCell>
                            <TableCell>Mensaje</TableCell>
                            <TableCell>Teléfono</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clientes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((cliente) => (
                            <TableRow key={cliente.idCliente}>
                                <TableCell>{cliente.idCliente}</TableCell>
                                <TableCell>{cliente.nombreCliente}</TableCell>
                                <TableCell>{cliente.emailCliente}</TableCell>
                                <TableCell>{cliente.mensaje}</TableCell>
                                <TableCell>{cliente.telefonoCliente}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleOpen(cliente)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(cliente.idCliente)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={clientes.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editMode ? 'Actualizar Cliente' : 'Agregar Cliente'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {editMode ? 'Actualiza los detalles del cliente.' : 'Ingresa los detalles del nuevo cliente.'}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nombre"
                        fullWidth
                        variant="outlined"
                        value={currentCliente.nombreCliente}
                        onChange={(e) => setCurrentCliente({ ...currentCliente, nombreCliente: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        fullWidth
                        variant="outlined"
                        value={currentCliente.emailCliente}
                        onChange={(e) => setCurrentCliente({ ...currentCliente, emailCliente: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Mensaje"
                        fullWidth
                        variant="outlined"
                        value={currentCliente.mensaje}
                        onChange={(e) => setCurrentCliente({ ...currentCliente, mensaje: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Teléfono"
                        fullWidth
                        variant="outlined"
                        value={currentCliente.telefonoCliente}
                        onChange={(e) => setCurrentCliente({ ...currentCliente, telefonoCliente: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        {editMode ? 'Actualizar' : 'Agregar'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Cliente;
