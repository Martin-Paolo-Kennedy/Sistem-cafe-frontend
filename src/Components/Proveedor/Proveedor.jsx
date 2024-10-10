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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ProveedorService from '../../Services/Proveedor';
import Swal from 'sweetalert2'; // Importa SweetAlert2

const Proveedor = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentSupplier, setCurrentSupplier] = useState({ 
        idProveedor: '', 
        nombreProveedor: '', 
        contacto: '', 
        direccion: '', 
        ciudad: '', 
        telefono: ''
    });
    const [error, setError] = useState('');

    // Cargar los proveedores al montar el componente
    useEffect(() => {
        const loadSuppliers = async () => {
            try {
                const response = await ProveedorService.getAllProveedor();
                setSuppliers(response.data);
            } catch (error) {
                console.error('Error al obtener proveedores:', error);
            }
        };

        loadSuppliers();
    }, []);

    // Abrir el modal de agregar/editar proveedor
    const handleOpen = (supplier = { idProveedor: '', nombreProveedor: '', contacto: '', direccion: '', ciudad: '', telefono: '' }) => {
        setCurrentSupplier(supplier);
        setEditMode(!!supplier.idProveedor);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentSupplier({ idProveedor: '', nombreProveedor: '', contacto: '', direccion: '', ciudad: '', telefono: '' });
        setEditMode(false);
        setError(''); // Resetear error al cerrar
    };

    // Función para validar la entrada de letras, espacios, puntos y comas
    const validateTextInput = (value) => {
        const regex = /^[A-Za-zñÑ\s]+$/; // Permite letras, ñ, Ñ, espacios, puntos y comas
        return regex.test(value);
    };

    // Función para validar números
    const validatePhoneInput = (value) => {
        const regex = /^[0-9\s]+$/; // Permite solo números, espacios y guiones
        return regex.test(value);
    };

    // Guardar cambios o crear nuevo proveedor
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validar cada campo antes de enviar
        if (!validateTextInput(currentSupplier.nombreProveedor)) {
            setError('El nombre solo puede contener letras, espacios, puntos y comas.');
            return;
        }
        if (!validateTextInput(currentSupplier.contacto)) {
            setError('El contacto solo puede contener letras, espacios, puntos y comas.');
            return;
        }
        if (!validateTextInput(currentSupplier.direccion)) {
            setError('La dirección solo puede contener letras, espacios, puntos y comas.');
            return;
        }
        if (!validateTextInput(currentSupplier.ciudad)) {
            setError('La ciudad solo puede contener letras, espacios, puntos y comas.');
            return;
        }
        if (!validatePhoneInput(currentSupplier.telefono)) {
            setError('El teléfono solo puede contener números, espacios y guiones.');
            return;
        }

        try {
            if (editMode) {
                await ProveedorService.updateProducto(currentSupplier);
                Swal.fire('Actualizado!', 'Proveedor actualizado con éxito', 'success');
            } else {
                await ProveedorService.createProveedor(currentSupplier);
                Swal.fire('Agregado!', 'Proveedor agregado con éxito', 'success');
            }
            handleClose();
            const response = await ProveedorService.getAllProveedor(); // Recargar proveedores después de guardar
            setSuppliers(response.data);
        } catch (error) {
            console.error('Error al guardar proveedor:', error);
            Swal.fire('Error!', 'Error al guardar el proveedor', 'error');
        }
    };

    // Eliminar proveedor
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'No podrás revertir esto!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!',
        });

        if (result.isConfirmed) {
            try {
                await ProveedorService.deleteProducto(id);
                const response = await ProveedorService.getAllProveedor(); // Recargar proveedores después de eliminar
                setSuppliers(response.data);
                Swal.fire('Eliminado!', 'Proveedor eliminado con éxito', 'success');
            } catch (error) {
                console.error('Error al eliminar proveedor:', error);
                Swal.fire('Error!', 'Error al eliminar el proveedor', 'error');
            }
        }
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
            <h1>Proveedores</h1>
            <Button variant="contained" color="primary" onClick={() => handleOpen()}>
                Agregar Proveedor
            </Button>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID Proveedor</TableCell>
                            <TableCell>Nombre Proveedor</TableCell>
                            <TableCell>Contacto</TableCell>
                            <TableCell>Dirección</TableCell>
                            <TableCell>Ciudad</TableCell>
                            <TableCell>Teléfono</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {suppliers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((supplier) => (
                            <TableRow key={supplier.idProveedor}>
                                <TableCell>{supplier.idProveedor}</TableCell>
                                <TableCell>{supplier.nombreProveedor}</TableCell>
                                <TableCell>{supplier.contacto}</TableCell>
                                <TableCell>{supplier.direccion}</TableCell>
                                <TableCell>{supplier.ciudad}</TableCell>
                                <TableCell>{supplier.telefono}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleOpen(supplier)}>
                                        <EditIcon />
                                    </Button>
                                    <Button onClick={() => handleDelete(supplier.idProveedor)}>
                                        <DeleteIcon />
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
                count={suppliers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editMode ? 'Actualizar Proveedor' : 'Agregar Proveedor'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {editMode ? 'Actualiza los detalles del proveedor.' : 'Ingresa los detalles del nuevo proveedor.'}
                    </DialogContentText>
                    {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar mensaje de error */}
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nombre"
                        fullWidth
                        variant="outlined"
                        value={currentSupplier.nombreProveedor}
                        onChange={(e) => setCurrentSupplier({ ...currentSupplier, nombreProveedor: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Contacto"
                        fullWidth
                        variant="outlined"
                        value={currentSupplier.contacto}
                        onChange={(e) => setCurrentSupplier({ ...currentSupplier, contacto: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Dirección"
                        fullWidth
                        variant="outlined"
                        value={currentSupplier.direccion}
                        onChange={(e) => setCurrentSupplier({ ...currentSupplier, direccion: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Ciudad"
                        fullWidth
                        variant="outlined"
                        value={currentSupplier.ciudad}
                        onChange={(e) => setCurrentSupplier({ ...currentSupplier, ciudad: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Teléfono"
                        fullWidth
                        variant="outlined"
                        value={currentSupplier.telefono}
                        onChange={(e) => setCurrentSupplier({ ...currentSupplier, telefono: e.target.value })}
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

export default Proveedor;
