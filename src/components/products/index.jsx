import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Filters from './Filters';
import ProductGrid from './ProductGrid';
import PaginationComponent from './PaginationComponent';

import { getProducts, deleteProduct } from '../../api/products.api';
import styles from './../products/products.module.scss';

const getItemsPerPage = () => {
  const width = window.innerWidth;

  if (width >= 1400) return 5;
  if (width >= 1200) return 4;
  if (width >= 991) return 3;
  return 4;
};

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  const [filters, setFilters] = useState({
    search: '',
    category: '',
    gender: '',
    sort: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        toast.error('Failed to load products');
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
      setCurrentPage(1);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success('Product deleted');
    } catch (err) {
      toast.error('Failed to delete product');
    }
  };

  const handleEdit = (product) => {
    navigate('/admin', {
      state: { editProduct: product },
    });
  };

  const filteredProducts = useMemo(() => {
    let data = [...products];

    if (filters.search) {
      data = data.filter((p) =>
        p.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category) {
      data = data.filter((p) => p.category === filters.category);
    }

    if (filters.gender) {
      data = data.filter((p) => p.category === filters.gender);
    }

    switch (filters.sort) {
      case 'low-high':
        data.sort((a, b) => a.price - b.price);
        break;

      case 'high-low':
        data.sort((a, b) => b.price - a.price);
        break;

      case 'a-z':
        data.sort((a, b) => a.title.localeCompare(b.title));
        break;

      case 'z-a':
        data.sort((a, b) => b.title.localeCompare(a.title));
        break;

      default:
        break;
    }

    return data;
  }, [products, filters]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className={styles.productPage}>
      <Filters filters={filters} onChange={handleFilterChange} />

      <ProductGrid
        products={paginatedProducts}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ProductPage;
