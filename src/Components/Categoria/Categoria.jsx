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
import Swal from 'sweetalert2'; // Importamos SweetAlert2
import CategoriaService from '../../Services/Categoria'; // Asegúrate de que este servicio esté correctamente definido

const Categoria = () => {
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentCategory, setCurrentCategory] = useState({ idCategoria: '', nombreCategoria: '' });
    const [error, setError] = useState(''); // Estado para mostrar mensaje de error en validación

    // Cargar categorías al cargar el componente
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await CategoriaService.getAllCategorias();
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
                Swal.fire("Error", "No se pudo cargar las categorías.", "error");
            }
        };

        loadCategories();
    }, []);

    // Abrir el diálogo para agregar/editar
    const handleOpen = (category = { idCategoria: '', nombreCategoria: '' }) => {
        setCurrentCategory(category);
        setEditMode(!!category.idCategoria);
        setOpen(true);
    };

    // Cerrar el diálogo
    const handleClose = () => {
        setOpen(false);
        setCurrentCategory({ idCategoria: '', nombreCategoria: '' });
        setEditMode(false);
        setError(''); // Reiniciamos el estado del error
    };

    // Función para validar la entrada de solo letras y espacios
    const validateInput = (value) => {
        const regex = /^[A-Za-zñÑ\s]+$/; // Solo permite letras (mayúsculas o minúsculas) y espacios
        if (value === '' || regex.test(value)) {
            setError(''); // No hay error si el valor es válido
            return true;
        } else {
            setError('Solo se permiten letras y espacios');
            return false;
        }
    };

    // Guardar categoría (agregar o actualizar)
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateInput(currentCategory.nombreCategoria)) {
            try {
                if (editMode) {
                    await CategoriaService.updateCategoria(currentCategory);
                    Swal.fire('¡Actualizado!', 'La categoría ha sido actualizada con éxito.', 'success');
                } else {
                    if (currentCategory.nombreCategoria.trim() === '') {
                        Swal.fire('Error', 'El nombre de la categoría no puede estar vacío.', 'error');
                        return;
                    }
                    await CategoriaService.createCategoria(currentCategory);
                    Swal.fire('¡Agregado!', 'La nueva categoría ha sido agregada con éxito.', 'success');
                }
                handleClose();
                const response = await CategoriaService.getAllCategorias();
                setCategories(response.data);
            } catch (error) {
                console.error("Error saving category:", error);
                Swal.fire('Error', 'Ocurrió un error al guardar la categoría.', 'error');
            }
        } else {
            Swal.fire('Error', 'El nombre de la categoría contiene caracteres inválidos.', 'error');
        }
    };

    // Eliminar categoría
    const handleDelete = async (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await CategoriaService.deleteCategoria(id);
                    const response = await CategoriaService.getAllCategorias();
                    setCategories(response.data);
                    Swal.fire('¡Eliminado!', 'La categoría ha sido eliminada con éxito.', 'success');
                } catch (error) {
                    console.error("Error deleting category:", error);
                    Swal.fire('Error', 'Ocurrió un error al eliminar la categoría.', 'error');
                }
            }
        });
    };

    // Cambiar página en la tabla
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Cambiar el número de filas por página
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Container>
            <h1>Categorías</h1>
            <Button variant="contained" color="primary" onClick={() => handleOpen()}>
                Agregar Categoría
            </Button>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category) => (
                            <TableRow key={category.idCategoria}>
                                <TableCell>{category.idCategoria}</TableCell>
                                <TableCell>{category.nombreCategoria}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleOpen(category)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(category.idCategoria)}>
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
                count={categories.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editMode ? 'Actualizar Categoría' : 'Agregar Categoría'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {editMode ? 'Actualiza los detalles de la categoría.' : 'Ingresa los detalles de la nueva categoría.'}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nombre"
                        fullWidth
                        variant="outlined"
                        value={currentCategory.nombreCategoria}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (validateInput(value)) {
                                setCurrentCategory({ ...currentCategory, nombreCategoria: value });
                            }
                        }}
                        error={!!error}
                        helperText={error}
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

export default Categoria;
