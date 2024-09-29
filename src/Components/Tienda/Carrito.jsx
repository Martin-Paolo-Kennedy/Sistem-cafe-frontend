import React, { useState } from 'react';
import {
  Card, CardContent, CardMedia, Typography, Button, Grid, Box, IconButton, Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const initialCartItems = [
  { id: 1, name: 'Café Espresso', price: 2.50, quantity: 1, image: 'https://via.placeholder.com/300x400' },
  { id: 2, name: 'Capuccino', price: 3.00, quantity: 2, image: 'https://via.placeholder.com/300x400' },
];

const Carrito = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleIncreaseQuantity = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleDecreaseQuantity = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  return (
    <Box sx={{ flexGrow: 1, padding: 4 }}>
      <Typography variant="h4" gutterBottom>Carrito de Compras</Typography>
      <Grid container spacing={4}>
        {cartItems.length > 0 ? cartItems.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={item.name}
                style={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography gutterBottom variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">Precio: ${item.price.toFixed(2)}</Typography>
                <Typography variant="body2" color="text.secondary">Cantidad: {item.quantity}</Typography>

                <Box mt={2} display="flex" justifyContent="space-between">
                  <IconButton onClick={() => handleDecreaseQuantity(item.id)}>
                    <RemoveIcon />
                  </IconButton>
                  <IconButton onClick={() => handleIncreaseQuantity(item.id)}>
                    <AddIcon />
                  </IconButton>
                  <IconButton onClick={() => handleRemoveItem(item.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )) : (
          <Typography variant="h6">El carrito está vacío</Typography>
        )}
      </Grid>

      {cartItems.length > 0 && (
        <>
          <Divider sx={{ my: 4 }} />
          <Typography variant="h5" align="right">Total: ${totalPrice}</Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>Proceder al Pago</Button>
        </>
      )}
    </Box>
  );
};

export default Carrito;
