import React from 'react';
import {
  Card, CardContent, CardMedia, Typography, Button, Grid, Box
} from '@mui/material';
import { styled } from '@mui/material/styles';

const products = [
  { id: 1, name: 'Café Espresso', price: '$2.50', image: 'https://via.placeholder.com/300x400' },
  { id: 2, name: 'Capuccino', price: '$3.00', image: 'https://via.placeholder.com/300x400' },
  { id: 3, name: 'Latte', price: '$3.50', image: 'https://via.placeholder.com/300x400' }
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
  return (
    <Box sx={{ flexGrow: 1, padding: 4 }}>
      <Grid container spacing={4}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <StyledCard>
              <CardMedia
                component="img"
                height="300"  // Ajuste de la altura
                width="100%"  // Asegura que ocupe todo el ancho del contenedor
                image={product.image}
                alt={product.name}
                style={{ objectFit: 'cover' }} // Asegura que la imagen se adapte sin deformarse
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.price}
                </Typography>
              </CardContent>
              <AddToCartButton variant="contained" color="primary">
                Añadir al carrito
              </AddToCartButton>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Tienda;
