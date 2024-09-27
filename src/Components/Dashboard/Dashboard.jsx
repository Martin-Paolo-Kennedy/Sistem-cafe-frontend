import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Box,
    AppBar,
    Toolbar,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    CssBaseline,
    ListItemButton,
    Collapse,
    IconButton
} from '@mui/material';
import CoffeeIcon from '@mui/icons-material/Coffee';
import {
    Dashboard,
    People,
    BarChart,
    Pets,
    ExpandLess,
    ExpandMore,
    MusicNote,
    Receipt,
    Assignment,
    Store,
    Group
} from '@mui/icons-material';

const drawerWidth = 240;

const Dashboards = () => {
    const [openAnimales, setOpenAnimales] = React.useState(false);
    const navigate = useNavigate();

    const handleClickAnimales = () => {
        setOpenAnimales(!openAnimales);
    };

    // Función para manejar el click y redirigir a la vista de Categoria
    const handleCategoriaClick = () => {
        navigate('/intranet/categoria'); // Asegúrate de que la ruta sea correcta
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <CoffeeIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Café Aroma
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {['Categoria', 'Producto', 'Orden', 'Factura', 'Reporte', 'Proveedor', 'Cliente', 'Usuario'].map((text, index) => (
                            <div key={text}>
                                {text === 'Categoria' ? (
                                    <ListItemButton onClick={handleCategoriaClick}>
                                        <ListItemIcon>
                                            <People />
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                ) : (
                                    <ListItemButton component={Link} to={text.toLowerCase()}>
                                        <ListItemIcon>
                                            {index === 0 ? (
                                                <Dashboard />
                                            ) : index === 1 ? (
                                                <People />
                                            ) : index === 2 ? (
                                                <BarChart />
                                            ) : index === 3 ? (
                                                <MusicNote />
                                            ) : index === 4 ? (
                                                <Receipt />
                                            ) : index === 5 ? (
                                                <Assignment />
                                            ) : index === 6 ? (
                                                <Store />
                                            ) : index === 7 ? (
                                                <Group />
                                            ) : (
                                                <BarChart />
                                            )}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                )}
                            </div>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
                <Toolbar />
                <Container>
                    
                    <Outlet /> {/* Aquí se renderizará el componente hijo */}
                </Container>
            </Box>
        </Box>
    );
};

export default Dashboards;
