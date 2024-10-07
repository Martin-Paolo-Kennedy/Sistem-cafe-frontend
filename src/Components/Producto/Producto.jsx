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
    FormControl
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ProductoService from '../../Services/producto';
import CategoriaService from '../../Services/categoria';
import ProveedorService from '../../Services/proveedor';

const Producto = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [users, setUsers] = useState([]); // Nuevo estado para usuarios
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({
        idProducto: '',
        nombreProducto: '',
        cantidad: '',
        precio: '',
        mensaje: '',
        id_categoria: '',
        id_proveedor: '',
        id_usuario: '', // Añadir id_usuario para el producto
    });

    // Cargar productos, categorías, proveedores y usuarios
    useEffect(() => {
        const loadProducts = async () => {
            const response = await ProductoService.getAllProducto();
            setProducts(response.data);
        };

        const loadCategories = async () => {
            const response = await CategoriaService.getAllCategorias();
            setCategories(response.data);
        };

        const loadSuppliers = async () => {
            const response = await ProveedorService.getAllProveedor();
            setSuppliers(response.data);
        };

        const loadUsers = async () => { // Cargar usuarios
            const response = await UsuarioService.getAllUsuarios(); // Asegúrate de que el servicio existe
            setUsers(response.data);
        };

        loadProducts();
        loadCategories();
        loadSuppliers();
        loadUsers(); // Llamar a la carga de usuarios
    }, []);

    // Abrir el diálogo de agregar/editar producto
    const handleOpen = (product = { idProducto: '', nombreProducto: '', cantidad: '', precio: '', mensaje: '', id_categoria: '', id_proveedor: '', id_usuario: '' }) => {
        setCurrentProduct(product);
        setEditMode(!!product.idProducto);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentProduct({ idProducto: '', nombreProducto: '', cantidad: '', precio: '', mensaje: '', id_categoria: '', id_proveedor: '', id_usuario: '' });
        setEditMode(false);
    };

    // Agregar o actualizar producto
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (editMode) {
                await ProductoService.updateProducto(currentProduct.idProducto, currentProduct);
            } else {
                await ProductoService.createProducto(currentProduct);
            }
            handleClose();
            const response = await ProductoService.getAllProducto();
            setProducts(response.data);
        } catch (error) {
            console.error("Error al agregar/actualizar el producto:", error);
        }
    };

    // Eliminar producto
    const handleDelete = async (id) => {
        try {
            await ProductoService.deleteProducto(id);
            const response = await ProductoService.getAllProducto();
            setProducts(response.data);
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
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
            <h1>Productos</h1>
            <Button variant="contained" color="primary" onClick={() => handleOpen()}>
                Agregar Producto
            </Button>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID Producto</TableCell>
                            <TableCell>Nombre Producto</TableCell>
                            <TableCell>Precio</TableCell>
                            <TableCell>Cantidad</TableCell>
                            <TableCell>Mensaje</TableCell>
                            <TableCell>Categoría</TableCell>
                            <TableCell>Proveedor</TableCell>
                            <TableCell>Usuario</TableCell> {/* Nueva columna para Usuario */}
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
                            <TableRow key={product.idProducto}>
                                <TableCell>{product.idProducto}</TableCell>
                                <TableCell>{product.nombreProducto}</TableCell>
                                <TableCell>{product.precio}</TableCell>
                                <TableCell>{product.cantidad}</TableCell>
                                <TableCell>{product.mensaje}</TableCell>
                                <TableCell>
                                    {product.categoria ? product.categoria.nombreCategoria : 'Sin Categoría'}
                                </TableCell>
                                <TableCell>
                                    {product.proveedor ? product.proveedor.nombreProveedor : 'Sin Proveedor'}
                                </TableCell>
                                <TableCell>
                                    {product.usuario ? product.usuario.nombreUsuario : 'Sin Usuario'} {/* Mostrar el nombre del usuario */}
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleOpen(product)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(product.idProducto)}>
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
                        label="Nombre Producto"
                        fullWidth
                        variant="outlined"
                        value={currentProduct.nombreProducto}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, nombreProducto: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Cantidad"
                        fullWidth
                        variant="outlined"
                        type="number"
                        value={currentProduct.cantidad}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, cantidad: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Precio"
                        fullWidth
                        variant="outlined"
                        type="number"
                        value={currentProduct.precio}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, precio: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Mensaje"
                        fullWidth
                        variant="outlined"
                        value={currentProduct.mensaje}
                        onChange={(e) => setCurrentProduct({ ...currentProduct, mensaje: e.target.value })}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Categoría</InputLabel>
                        <Select
                            value={currentProduct.id_categoria}
                            onChange={(e) => setCurrentProduct({ ...currentProduct, id_categoria: e.target.value })}
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.idCategoria} value={category.idCategoria}>
                                    {category.nombreCategoria}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Proveedor</InputLabel>
                        <Select
                            value={currentProduct.id_proveedor}
                            onChange={(e) => setCurrentProduct({ ...currentProduct, id_proveedor: e.target.value })}
                        >
                            {suppliers.map((supplier) => (
                                <MenuItem key={supplier.idProveedor} value={supplier.idProveedor}>
                                    {supplier.nombreProveedor}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Usuario</InputLabel>
                        <Select
                            value={currentProduct.id_usuario}
                            onChange={(e) => setCurrentProduct({ ...currentProduct, id_usuario: e.target.value })}
                        >
                            {users.map((user) => (
                                <MenuItem key={user.idUsuario} value={user.idUsuario}>
                                    {user.nombreUsuario}
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

export default Producto;

