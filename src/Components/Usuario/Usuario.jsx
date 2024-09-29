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
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

// Mock API functions (Reemplaza con tus llamadas a la API real)
const fetchUsuarios = async () => {
    return [
        { id: 1, nombre: 'Juan Pérez', email: 'juanperez@gmail.com', password: '****', rol: 'Admin' },
        { id: 2, nombre: 'María García', email: 'mariagarcia@gmail.com', password: '****', rol: 'User' },
    ];
};

const createUsuario = async (usuario) => {
    console.log('Creando usuario', usuario);
};

const updateUsuario = async (id, usuario) => {
    console.log(`Actualizando usuario ${id}`, usuario);
};

const deleteUsuario = async (id) => {
    console.log(`Eliminando usuario ${id}`);
};

const roles = ['Admin', 'User', 'Guest']; // Lista de roles disponibles

const Usuario = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentUsuario, setCurrentUsuario] = useState({ id: '', nombre: '', email: '', password: '', rol: '' });

    useEffect(() => {
        const loadUsuarios = async () => {
            const data = await fetchUsuarios();
            setUsuarios(data);
        };

        loadUsuarios();
    }, []);

    const handleOpen = (usuario = { id: '', nombre: '', email: '', password: '', rol: '' }) => {
        setCurrentUsuario(usuario);
        setEditMode(!!usuario.id); // Si tiene ID, estamos en modo edición
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentUsuario({ id: '', nombre: '', email: '', password: '', rol: '' });
        setEditMode(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (editMode) {
            await updateUsuario(currentUsuario.id, currentUsuario);
        } else {
            await createUsuario(currentUsuario);
        }
        handleClose();
        // Recargar usuarios después de la creación/edición
        const data = await fetchUsuarios();
        setUsuarios(data);
    };

    const handleDelete = async (id) => {
        await deleteUsuario(id);
        const data = await fetchUsuarios();
        setUsuarios(data);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Container>
            <h1>Usuarios</h1>
            <Button variant="contained" color="primary" onClick={() => handleOpen()}>
                Agregar Usuario
            </Button>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Password</TableCell>
                            <TableCell>Rol</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usuarios.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((usuario) => (
                            <TableRow key={usuario.id}>
                                <TableCell>{usuario.id}</TableCell>
                                <TableCell>{usuario.nombre}</TableCell>
                                <TableCell>{usuario.email}</TableCell>
                                <TableCell>{'****'}</TableCell> {/* Ocultar el password */}
                                <TableCell>{usuario.rol}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleOpen(usuario)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(usuario.id)}>
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
                count={usuarios.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editMode ? 'Actualizar Usuario' : 'Agregar Usuario'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {editMode ? 'Actualiza los detalles del usuario.' : 'Ingresa los detalles del nuevo usuario.'}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nombre"
                        fullWidth
                        variant="outlined"
                        value={currentUsuario.nombre}
                        onChange={(e) => setCurrentUsuario({ ...currentUsuario, nombre: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        fullWidth
                        variant="outlined"
                        value={currentUsuario.email}
                        onChange={(e) => setCurrentUsuario({ ...currentUsuario, email: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={currentUsuario.password}
                        onChange={(e) => setCurrentUsuario({ ...currentUsuario, password: e.target.value })}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Rol</InputLabel>
                        <Select
                            value={currentUsuario.rol}
                            onChange={(e) => setCurrentUsuario({ ...currentUsuario, rol: e.target.value })}
                        >
                            {roles.map((rol) => (
                                <MenuItem key={rol} value={rol}>
                                    {rol}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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

export default Usuario;
