import { useLocation, useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import ProductForm from './ProductForm';
import { addProduct, updateProduct } from '../../api/products.api';
import { toast } from 'react-toastify';
import styles from './../admin/admin.module.scss';

const AdminPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const editProduct = location.state?.editProduct || null;

  const handleAdd = async (product) => {
    try {
      await addProduct(product);
      toast.success(`${product.title} - Product added`);
      return true;
    } catch (err) {
      toast.error('Failed to add product');
      return false;
    }
  };

  const handleUpdate = async (product) => {
    if (!editProduct) return;

    try {
      await updateProduct(editProduct.id, product);
      toast.success('Product updated');
      navigate('/products');
    } catch (err) {
      toast.error('Failed to update product');
    }
  };

  return (
    <div className={styles.adminPage}>
      <Row className={styles.contentRow}>
        <Col md={10} lg={8} xl={7} xxl={5}>
        {
          editProduct ? 
          <>
            <ProductForm
              title="Edit Product"
              submitText="Update Product"
              onSubmit={handleUpdate}
              initialEditData={editProduct}
            />
          </>
          :
          <>
            <ProductForm
              title="Add New Product"
              submitText="Add Product"
              onSubmit={handleAdd}
            />
          </>
        }
        </Col>
      </Row>
    </div>
  );
};

export default AdminPage;
