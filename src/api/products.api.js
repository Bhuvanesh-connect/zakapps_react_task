const API_URL = 'http://localhost:5000/products';

/** Fetch all products **/

export const getProducts = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
};

/** Add new product **/

export const addProduct = async (product) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });

  if (!res.ok) throw new Error('Failed to add product');
  return res.json();
};

/** Update/Edit product **/

export const updateProduct = async (id, product) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...product, id }),
  });

  if (!res.ok) throw new Error('Failed to update product');
  return res.json();
};

/** Delete product **/

export const deleteProduct = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) throw new Error('Failed to delete product');
};
