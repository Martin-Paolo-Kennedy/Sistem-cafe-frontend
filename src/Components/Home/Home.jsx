import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    Grid,
    Box,
    TextField,
    Card,
    CardContent,
    IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CoffeeIcon from '@mui/icons-material/Coffee';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmailIcon from '@mui/icons-material/Email';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Slider from 'react-slick';
import ClienteService from '../../Services/Cliente'; // Ajusta la ruta según tu estructura de carpetas


const Home = () => {

    const navigate = useNavigate();

    // Función para manejar el click y redirigir a la vista de Tienda
    const handleTiendaClick = () => {
        navigate('/tienda'); // Redirigir a la ruta de Tienda
    };


    // Función para manejar el click y redirigir a la vista de Intranet
    const handleIntranetClick = () => {
        navigate('/intranet'); // Redirigir a la ruta de Intranet
    };

    // Configuración del carrusel
    const settings = {
        dots: true,
        infinite: true,
        speed: 100,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* Barra de navegación */}
            <AppBar position="static">
                <Toolbar>
                    <CoffeeIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Café Aroma
                    </Typography>
                    <Button color="inherit" onClick={handleTiendaClick}>Tienda</Button>
                    <Button color="inherit" href="#menu">Menú</Button>
                    <Button color="inherit" href="#ubicacion">Ubicación</Button>
                    <Button color="inherit" href="#contacto">Contacto</Button>
                    <Button color="inherit" onClick={handleIntranetClick}>Intranet</Button>
                </Toolbar>
            </AppBar>

            {/* Sección de Carrusel y Bienvenida */}
            <Box sx={{ position: 'relative', textAlign: 'center', overflow: 'hidden' }} id="inicio">
                <Slider {...settings}>
                    {/* Agrega aquí las imágenes que quieras mostrar en el carrusel */}
                    <div>
                        <img src="" alt="Café" style={{ width: '100%', height: '650px' }} />
                    </div>
                    <div>
                        <img src="" alt="Café" style={{ width: '100%', height: '650px' }} />
                    </div>
                    <div>
                        <img src="" alt="Café" style={{ width: '100%', height: '650px' }} />
                    </div>
                </Slider>

                {/* Contenedor para el texto de bienvenida */}
                <Container sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', textAlign: 'center' }}>
                    <Typography variant="h2" component="h1" gutterBottom>
                        Bienvenidos a Café Aroma
                    </Typography>
                    <Typography variant="h5" paragraph>
                        Descubre el arte del café en un ambiente acogedor
                    </Typography>
                    <Button variant="contained" size="large" color="primary">
                        Ver Menú
                    </Button>
                </Container>
            </Box>

            <Container sx={{ py: 8 }} id="menu">
                <Typography variant="h3" align="center" gutterBottom>
                    Nuestro Menú
                </Typography>
                <Grid container spacing={4}>
                    {[
                        { name: "Espresso", image: "" },
                        { name: "Cappuccino", image: "" },
                        { name: "Latte", image: "" },
                        { name: "Mocha", image: "" },
                        { name: "Pastelería", image: "" },
                    ].map((item) => (
                        <Grid item key={item.name} xs={12} sm={6} md={4}>
                            <Card sx={{ textAlign: 'center', p: 3 }}>
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    style={{ width: '200px', height: '200px', borderRadius: '8px', marginBottom: '16px' }} // Ajusta el tamaño aquí
                                />
                                <Typography variant="h6" component="h3">
                                    {item.name}
                                </Typography>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>



            {/* Sección de Ubicación */}
            <Box sx={{ py: 8, bgcolor: '#f7f7f7' }} id="ubicacion">
                <Container>
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography variant="h3" gutterBottom>
                                Nuestra Ubicación
                            </Typography>
                            <Typography paragraph>
                                Encuéntranos en el corazón de la ciudad, ofreciendo café de la mejor calidad.
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <LocationOnIcon sx={{ mr: 1 }} color="primary" />
                                <Typography>Calle Principal 123, Ciudad</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <AccessTimeIcon sx={{ mr: 1 }} color="primary" />
                                <Typography>Lunes a Domingo: 7:00 AM - 10:00 PM</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ height: 300, bgcolor: 'grey.200', borderRadius: 1 }} />
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Sección de Contacto */}
            <Container sx={{ py: 8 }} id="contacto">
                <Typography variant="h3" align="center" gutterBottom>
                    Contáctanos
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1, maxWidth: 600, mx: 'auto' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Nombre"
                        name="name"
                        autoComplete="name"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="message"
                        label="Mensaje"
                        id="message"
                        multiline
                        rows={4}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Enviar Mensaje
                    </Button>
                </Box>
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <IconButton color="primary" aria-label="email">
                        <EmailIcon />
                    </IconButton>
                    <Typography variant="body2">
                        info@cafearoma.com
                    </Typography>
                </Box>
            </Container>

            {/* Pie de página */}
            <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
                <Container maxWidth="lg">
                    <Typography variant="body2" color="text.secondary" align="center">
                        © 2024 Café Aroma. Todos los derechos reservados.
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
}

export default Home;
