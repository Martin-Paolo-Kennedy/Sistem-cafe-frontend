import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'; // Importar SweetAlert
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
import UsuarioService from '../../Services/Usuario';
import RolService from '../../Services/Rol';

const Usuario = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentUsuario, setCurrentUsuario] = useState({ idUsuario: '', nombreUsuario: '', email: '', password: '', rol: { idRol: '' } });
    const [roles, setRoles] = useState([]); // Estado para almacenar los roles

    useEffect(() => {
        const loadUsuarios = async () => {
            const data = await fetchUsuarios();
            setUsuarios(data);
        };

        const loadRoles = async () => {
            const rolesData = await RolService.getAllRol();
            setRoles(rolesData.data);
        };

        loadUsuarios();
        loadRoles();
    }, []);

    const fetchUsuarios = async () => {
        try {
            const response = await UsuarioService.getAllUsuario();
            return response.data;
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
            Swal.fire('Error', 'No se pudieron cargar los usuarios', 'error');
            return [];
        }
    };

    const createUsuario = async (usuario) => {
        try {
            await UsuarioService.createUsuario(usuario);
            Swal.fire('Éxito', 'Usuario creado exitosamente', 'success');
        } catch (error) {
            console.error("Error al crear usuario:", error);
            Swal.fire('Error', 'No se pudo crear el usuario', 'error');
        }
    };

    const updateUsuario = async (id, usuario) => {
        try {
            await UsuarioService.updateUsuario({ ...usuario, idUsuario: id });
            Swal.fire('Éxito', 'Usuario actualizado exitosamente', 'success');
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            Swal.fire('Error', 'No se pudo actualizar el usuario', 'error');
        }
    };

    const deleteUsuario = async (id) => {
        try {
            await UsuarioService.deleteUsuario(id);
            Swal.fire('Éxito', 'Usuario eliminado exitosamente', 'success');
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            Swal.fire('Error', 'No se pudo eliminar el usuario', 'error');
        }
    };

    const handleOpen = (usuario = { idUsuario: '', nombreUsuario: '', email: '', password: '', rol: { idRol: '' } }) => {
        setCurrentUsuario(usuario);
        setEditMode(!!usuario.idUsuario);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentUsuario({ idUsuario: '', nombreUsuario: '', email: '', password: '', rol: { idRol: '' } });
        setEditMode(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (editMode) {
            await updateUsuario(currentUsuario.idUsuario, currentUsuario);
        } else {
            await createUsuario(currentUsuario);
        }
        handleClose();
        const data = await fetchUsuarios();
        setUsuarios(data);
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteUsuario(id);
                const data = await fetchUsuarios();
                setUsuarios(data);
            }
        });
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
                            <TableRow key={usuario.idUsuario}>
                                <TableCell>{usuario.idUsuario}</TableCell>
                                <TableCell>{usuario.nombreUsuario}</TableCell>
                                <TableCell>{usuario.email}</TableCell>
                                <TableCell>{'****'}</TableCell>
                                <TableCell>{usuario.rol?.nombre}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleOpen(usuario)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(usuario.idUsuario)}>
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
                <DialogTitle>{editMode ? 'Editar Usuario' : 'Agregar Usuario'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>Por favor ingrese la información del usuario.</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nombre"
                        fullWidth
                        value={currentUsuario.nombreUsuario}
                        onChange={(e) => setCurrentUsuario({ ...currentUsuario, nombreUsuario: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        fullWidth
                        value={currentUsuario.email}
                        onChange={(e) => setCurrentUsuario({ ...currentUsuario, email: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Password"
                        fullWidth
                        type="password"
                        value={currentUsuario.password}
                        onChange={(e) => setCurrentUsuario({ ...currentUsuario, password: e.target.value })}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Rol</InputLabel>
                        <Select
                            value={currentUsuario.rol?.idRol || ''}
                            onChange={(e) => setCurrentUsuario({ ...currentUsuario, rol: { idRol: e.target.value } })}
                        >
                            {roles.map((rol) => (
                                <MenuItem key={rol.idRol} value={rol.idRol}>
                                    {rol.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
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
