import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  TextField,
  Box,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CoffeeIcon from '@mui/icons-material/Coffee';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmailIcon from '@mui/icons-material/Email';

const HeroSection = styled('section')(({ theme }) => ({
  backgroundImage: 'url("/placeholder.svg?height=600&width=800")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: theme.palette.common.white,
  padding: theme.spacing(15, 0),
  textAlign: 'center',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const SpecialtyCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
}));

export default function CafeLanding() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <CoffeeIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Café Aroma
          </Typography>
          <Button color="inherit" href="#inicio">Inicio</Button>
          <Button color="inherit" href="#menu">Menú</Button>
          <Button color="inherit" href="#ubicacion">Ubicación</Button>
          <Button color="inherit" href="#contacto">Contacto</Button>
        </Toolbar>
      </AppBar>

      <HeroSection id="inicio">
        <Container>
          <Typography variant="h2" component="h1" gutterBottom>
            Bienvenidos a Café Aroma
          </Typography>
          <Typography variant="h5" paragraph>
            Descubre el arte del café perfecto en el corazón de la ciudad
          </Typography>
          <Button variant="contained" size="large" color="primary">
            Ver Menú
          </Button>
        </Container>
      </HeroSection>

      <Container sx={{ py: 8 }} id="menu">
        <SectionTitle variant="h3" align="center">
          Nuestras Especialidades
        </SectionTitle>
        <Grid container spacing={4}>
          {["Espresso Clásico", "Cappuccino Cremoso", "Latte Artístico", "Mocha Deluxe", "Café Frío", "Pastelería Fresca"].map((item) => (
            <Grid item key={item} xs={12} sm={6} md={4}>
              <SpecialtyCard>
                <CoffeeIcon sx={{ fontSize: 40, mb: 2 }} color="primary" />
                <Typography variant="h6" component="h3">
                  {item}
                </Typography>
              </SpecialtyCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ bgcolor: 'background.paper', py: 8 }} id="ubicacion">
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <SectionTitle variant="h3">
                Nuestra Ubicación
              </SectionTitle>
              <Typography paragraph color="text.secondary">
                Encuéntranos en el corazón de la ciudad
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOnIcon sx={{ mr: 1 }} color="primary" />
                <Typography>Calle del Café 123, Ciudad</Typography>
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

      <Container sx={{ py: 8 }} id="contacto">
        <SectionTitle variant="h3" align="center">
          Contáctanos
        </SectionTitle>
        <Box component="form" noValidate sx={{ mt: 1, maxWidth: 400, mx: 'auto' }}>
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

      <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © 2024 Café Aroma. Todos los derechos reservados.
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
            <Button color="inherit" href="#">Términos de Servicio</Button>
            <Button color="inherit" href="#">Política de Privacidad</Button>
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}