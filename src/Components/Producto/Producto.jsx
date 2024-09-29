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

// Mock API functions (deberías reemplazar estos con tus llamadas reales a la API)
const fetchProducts = async () => {
    // Reemplaza con tu API para obtener productos
    return [
        { id: 1, name: 'Café Espresso', unit: 'kg', price: 15.99 },
        { id: 2, name: 'Café Americano', unit: 'kg', price: 12.99 },
    ];
};

const createProduct = async (product) => {
    // Reemplaza con tu API para crear producto
    console.log('Creating product', product);
};

const updateProduct = async (id, product) => {
    // Reemplaza con tu API para actualizar producto
    console.log(`Updating product ${id}`, product);
};

const deleteProduct = async (id) => {
    // Reemplaza con tu API para eliminar producto
    console.log(`Deleting product ${id}`);
};

const Producto = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({ id: '', name: '', unit: '', price: '' });

    // Cargar los productos al montar el componente
    useEffect(() => {
        const loadProducts = async () => {
            const data = await fetchProducts();
            setProducts(data);
        };

        loadProducts();
    }, []);

    // Abrir el modal de agregar/editar producto
    const handleOpen = (product = { id: '', name: '', unit: '', price: '' }) => {
        setCurrentProduct(product);
        setEditMode(!!product.id); // Modo de edición si el producto tiene ID
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentProduct({ id: '', name: '', unit: '', price: '' });
        setEditMode(false);
    };

    // Guardar cambios o crear nuevo producto
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (editMode) {
            await updateProduct(currentProduct.id, currentProduct);
        } else {
            await createProduct(currentProduct);
        }
        handleClose();
        // Recargar productos después de guardar
        const data = await fetchProducts();
        setProducts(data);
    };

    // Eliminar producto
    const handleDelete = async (id) => {
        await deleteProduct(id);
        const data = await fetchProducts();
        setProducts(data);
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
            <h1>Productos</h1>
            <Button variant="contained" color="primary" onClick={() => handleOpen()}>
                Agregar Producto
            </Button>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Unidad</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.unit}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleOpen(product)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(product.id)}>
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
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editMode ? 'Actualizar Producto' : 'Agregar Producto'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {editMode ? 'Actualiza los detalles del producto.' : 'Ingresa los detalles del nuevo producto.'}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nombre"
                        fullWidth
                        variant="outlined"
                        value={currentProduct.name}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Unidad"
                        fullWidth
                        variant="outlined"
                        value={currentProduct.unit}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, unit: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Precio"
                        fullWidth
                        variant="outlined"
                        type="number"
                        value={currentProduct.price}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
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

export default Producto;
