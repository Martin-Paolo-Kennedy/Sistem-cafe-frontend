import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, Card, CardContent, CardMedia, Button, Grid, Box,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton,
  Badge, Divider, List, ListItem, ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled } from '@mui/material/styles';
import ProductoService from '../../Services/producto';
import PedidoService from '../../Services/Pedido';
import DetallePedidoService from '../../Services/DetallePedido';

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
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [clientData, setClientData] = useState({
    name: '',
    email: '',
    telefonoCliente: '' // Cambiado a telefonoCliente
  });
  const [products, setProducts] = useState([]);

  // UseEffect para cargar los productos desde la API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductoService.getAllProducto();
        setProducts(response.data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleClickOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
    setQuantity(1);
  };

  const handleAddToCart = () => {
    const updatedCart = [...cart, { ...selectedProduct, cantidad: quantity }];
    setCart(updatedCart);
    handleClose();
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.cantidad, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0).toFixed(2);
  };

  const handleCartClickOpen = () => {
    setCartOpen(true);
  };

  const handleCartClose = () => {
    setCartOpen(false);
  };

  const handleCheckoutOpen = () => {
    setCheckoutOpen(true);
    handleCartClose();
  };

  const handleCheckoutClose = () => {
    setCheckoutOpen(false);
    setClientData({
      name: '',
      email: '',
      telefonoCliente: '' // Reiniciar campo telefonoCliente
    });
  };

  const handleClientDataChange = (e) => {
    const { name, value } = e.target;
    setClientData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFinalizePurchase = async () => {
    try {
        const response = await PedidoService.createPedido(clientData);
        console.log('Pedido registrado:', response.data);
    } catch (error) {
        console.error('Error al registrar el pedido:', error);
        // Si el error tiene una respuesta, muestra el mensaje de error
        if (error.response) {
            console.error('Error response data:', error.response.data);
        }
    }
};

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tienda de Café
          </Typography>
          <IconButton color="inherit" onClick={handleCartClickOpen}>
            <Badge badgeContent={getTotalItems()} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ flexGrow: 1, padding: 4 }}>
        <Grid container spacing={4}>
          {products.map(product => (
            <Grid item xs={12} sm={6} md={4} key={product.idProducto}>
              <StyledCard>
                <CardMedia
                  component="img"
                  height="300"
                  image={product.image || 'https://via.placeholder.com/300x400'}
                  alt={product.nombreProducto}
                  style={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {product.nombreProducto}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${product.precio.toFixed(2)}
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

      {/* Modal para añadir al carrito */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Añadir al Carrito</DialogTitle>
        <DialogContent>
          <Typography variant="h6">{selectedProduct?.nombreProducto}</Typography>
          <Typography variant="body1">Precio: ${selectedProduct?.precio.toFixed(2)}</Typography>
          <TextField
            label="Cantidad"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            InputProps={{ inputProps: { min: 1 } }}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancelar</Button>
          <Button onClick={handleAddToCart} color="primary">Añadir</Button>
        </DialogActions>
      </Dialog>

      {/* Modal del carrito */}
      <Dialog open={cartOpen} onClose={handleCartClose}>
        <DialogTitle>Carrito de Compras</DialogTitle>
        <DialogContent>
          <List>
            {cart.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item.nombreProducto} secondary={`Cantidad: ${item.cantidad}`} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <Typography variant="h6">Total: ${getTotalPrice()}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCartClose} color="primary">Cerrar</Button>
          <Button onClick={handleCheckoutOpen} color="primary">Finalizar Compra</Button>
        </DialogActions>
      </Dialog>

      {/* Modal para finalizar la compra */}
      <Dialog open={checkoutOpen} onClose={handleCheckoutClose}>
        <DialogTitle>Finalizar Compra</DialogTitle>
        <DialogContent>
          <Typography variant="h6">Resumen de Productos</Typography>
          <List>
            {cart.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item.nombreProducto} secondary={`Cantidad: ${item.cantidad}`} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <Typography variant="h6">Total: ${getTotalPrice()}</Typography>
          <TextField
            label="Nombre"
            name="name"
            value={clientData.name}
            onChange={handleClientDataChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Correo"
            name="email"
            value={clientData.email}
            onChange={handleClientDataChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Teléfono" // Cambiado a Telefono
            name="telefonoCliente" // Cambiado a telefonoCliente
            value={clientData.telefonoCliente} // Cambiado a telefonoCliente
            onChange={handleClientDataChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCheckoutClose} color="primary">Cancelar</Button>
          <Button onClick={handleFinalizePurchase} color="primary">Confirmar Compra</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Tienda;
