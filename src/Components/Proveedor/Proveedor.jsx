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
import ProveedorService from '../../Services/Proveedor'; // Importa el servicio de Proveedor

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
        setEditMode(!!supplier.idProveedor); // Modo de edición si el proveedor tiene ID
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentSupplier({ idProveedor: '', nombreProveedor: '', contacto: '', direccion: '', ciudad: '', telefono: '' });
        setEditMode(false);
    };

    // Guardar cambios o crear nuevo proveedor
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (editMode) {
                await ProveedorService.updateProducto(currentSupplier);
            } else {
                await ProveedorService.createProveedor(currentSupplier);
            }
            handleClose();
            const response = await ProveedorService.getAllProveedor(); // Recargar proveedores después de guardar
            setSuppliers(response.data);
        } catch (error) {
            console.error('Error al guardar proveedor:', error);
        }
    };

    // Eliminar proveedor
    const handleDelete = async (id) => {
        try {
            await ProveedorService.deleteProducto(id);
            const response = await ProveedorService.getAllProveedor(); // Recargar proveedores después de eliminar
            setSuppliers(response.data);
        } catch (error) {
            console.error('Error al eliminar proveedor:', error);
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
                                    <IconButton onClick={() => handleOpen(supplier)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(supplier.idProveedor)}>
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
