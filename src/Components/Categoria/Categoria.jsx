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
import CategoriaService from '../../Services/categoria';

const Categoria = () => {
    const [categories, setCategories] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentCategory, setCurrentCategory] = useState({ idCategoria: '', nombreCategoria: '' });

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await CategoriaService.getAllCategorias();
                console.log("Datos de categorías:", response.data);
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        loadCategories();
    }, []);

    const handleOpen = (category = { idCategoria: '', nombreCategoria: '' }) => {
        setCurrentCategory(category);
        setEditMode(!!category.idCategoria);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentCategory({ idCategoria: '', nombreCategoria: '' });
        setEditMode(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (editMode) {
                await CategoriaService.updateCategoria(currentCategory);
            } else {
                if (currentCategory.nombreCategoria.trim() === '') {
                    alert("El nombre de la categoría no puede estar vacío.");
                    return; // Evitar el registro si el campo está vacío
                }
                await CategoriaService.createCategoria(currentCategory);
            }
            handleClose();
            const response = await CategoriaService.getAllCategorias();
            setCategories(response.data);
        } catch (error) {
            console.error("Error saving category:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await CategoriaService.deleteCategoria(id);
            const response = await CategoriaService.getAllCategorias();
            setCategories(response.data);
        } catch (error) {
            console.error("Error deleting category:", error);
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
                        onChange={(e) => setCurrentCategory({ ...currentCategory, nombreCategoria: e.target.value })}
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
