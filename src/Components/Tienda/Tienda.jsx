import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Card, CardContent, CardMedia, Button, Grid, Box, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Badge, Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/material/styles';

const products = [
  { id: 1, name: 'Café Espresso', price: 2.50, image: 'https://via.placeholder.com/300x400' },
  { id: 2, name: 'Capuccino', price: 3.00, image: 'https://via.placeholder.com/300x400' },
  { id: 3, name: 'Latte', price: 3.50, image: 'https://via.placeholder.com/300x400' }
];

const StyledCard = styled(Card)({
  position: 'relative',
  '&:hover': {
    '& .MuiButton-root': {
      opacity: 1,
    }
  }
});

const AddToCartButton = styled(Button)({
  position: 'absolute',
  bottom: 0,
  right: 0,
  margin: '10px',
  opacity: 0,
  transition: 'opacity 0.3s ease',
});

const Tienda = () => {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);  // Estado para el carrito
  const [cartOpen, setCartOpen] = useState(false); // Estado para el dialog del carrito
  const [checkoutOpen, setCheckoutOpen] = useState(false); // Estado para el dialog de finalizar compra
  const [clientData, setClientData] = useState({
    name: '',
    email: '',
    address: ''
  });

  // Maneja la apertura del diálogo para añadir productos al carrito
  const handleClickOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  // Cierra el diálogo de añadir al carrito
  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
    setQuantity(1);
  };

  // Añadir producto al carrito
  const handleAddToCart = () => {
    const updatedCart = [...cart, { ...selectedProduct, quantity }];
    setCart(updatedCart);
    handleClose();
  };

  // Calcular la cantidad total de productos en el carrito
  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + parseInt(item.quantity), 0);
  };

  // Calcular el total del carrito
  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  // Maneja la apertura del diálogo del carrito
  const handleCartClickOpen = () => {
    setCartOpen(true);
  };

  // Cierra el diálogo del carrito
  const handleCartClose = () => {
    setCartOpen(false);
  };

  // Abre el modal de finalizar compra
  const handleCheckoutOpen = () => {
    setCheckoutOpen(true);
  };

  // Cierra el modal de finalizar compra
  const handleCheckoutClose = () => {
    setCheckoutOpen(false);
  };

  // Manejar el cambio de datos del cliente
  const handleClientDataChange = (e) => {
    const { name, value } = e.target;
    setClientData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tienda de Café
          </Typography>
          <Button color="inherit">Inicio</Button>
          <Button color="inherit">Productos</Button>
          <Button color="inherit">Contacto</Button>

          {/* Icono del carrito de compras con el número de productos */}
          <IconButton color="inherit" onClick={handleCartClickOpen}>
            <Badge badgeContent={getTotalItems()} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Contenido de la Tienda */}
      <Box sx={{ flexGrow: 1, padding: 4 }}>
        <Grid container spacing={4}>
          {products.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <StyledCard>
                <CardMedia
                  component="img"
                  height="300"
                  width="100%"
                  image={product.image}
                  alt={product.name}
                  style={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${product.price.toFixed(2)}
                  </Typography>
                </CardContent>
                <AddToCartButton variant="contained" color="primary" onClick={() => handleClickOpen(product)}>
                  Añadir al carrito
                </AddToCartButton>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Dialog para Añadir al Carrito */}
      {selectedProduct && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{selectedProduct.name}</DialogTitle>
          <DialogContent>
            <Typography variant="body1" color="text.primary">
              Precio: ${selectedProduct.price.toFixed(2)}
            </Typography>
            <TextField
              label="Cantidad"
              type="number"
              fullWidth
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              inputProps={{ min: 1 }}
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">Cancelar</Button>
            <Button onClick={handleAddToCart} color="primary">Registrar</Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Dialog del Carrito */}
      <Dialog open={cartOpen} onClose={handleCartClose}>
        <DialogTitle>Carrito de Compras</DialogTitle>
        <DialogContent>
          {cart.length > 0 ? (
            <>
              {cart.map((item, index) => (
                <Box key={index} mb={2}>
                  <Typography variant="body1">{item.name} - {item.quantity} unidad(es)</Typography>
                  <Typography variant="body2">Precio por unidad: ${item.price.toFixed(2)}</Typography>
                </Box>
              ))}
              <Typography variant="h6">Total: ${getTotalPrice()}</Typography>
            </>
          ) : (
            <Typography>No hay productos en el carrito.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCartClose} color="secondary">Ver carrito</Button>
          <Button color="primary" variant="contained" onClick={handleCheckoutOpen}>Finalizar compra</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de Finalizar Compra */}
      <Dialog open={checkoutOpen} onClose={handleCheckoutClose} maxWidth="lg" fullWidth>
        <DialogTitle>Finalizar compra</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {/* Formulario del cliente */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Datos del Cliente</Typography>
              <TextField
                label="Nombre"
                name="name"
                fullWidth
                value={clientData.name}
                onChange={handleClientDataChange}
                sx={{ mt: 2 }}
              />
              <TextField
                label="Correo Electrónico"
                name="email"
                fullWidth
                value={clientData.email}
                onChange={handleClientDataChange}
                sx={{ mt: 2 }}
              />
              <TextField
                label="Dirección"
                name="address"
                fullWidth
                value={clientData.address}
                onChange={handleClientDataChange}
                sx={{ mt: 2 }}
              />
            </Grid>

            {/* Resumen de productos */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Resumen de Productos</Typography>
              {cart.map((item, index) => (
                <Box key={index} mb={2}>
                  <Typography variant="body1">{item.name}</Typography>
                  <Typography variant="body2">Cantidad: {item.quantity}</Typography>
                  <Typography variant="body2">Precio: ${item.price.toFixed(2)}</Typography>
                  <Divider sx={{ my: 1 }} />
                </Box>
              ))}
              <Typography variant="h6">Total: ${getTotalPrice()}</Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCheckoutClose} color="secondary">Cancelar</Button>
          <Button color="primary" variant="contained">Realizar pedido</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Tienda;
