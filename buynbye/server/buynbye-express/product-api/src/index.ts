import express from 'express';
import cors from 'cors';
import { products } from './data/product';

const app = express();
app.use(cors());

app.get('/products', (req, res) => {
  const category = req.query.category as string;
  let filteredProducts = [...products];
  if (category) {
    filteredProducts = products.filter((p) =>
      p.category.toLowerCase().includes(category.toLowerCase())
    );
  }
  res.json(filteredProducts);
});

app.get('/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
