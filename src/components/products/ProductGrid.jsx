import { useState } from 'react';
import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import cx from 'classnames';

import styles from './../products/products.module.scss';

const ProductGrid = ({ products, onDelete, onEdit }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedProductId(id);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedProductId !== null) {
      onDelete(selectedProductId);
    }

    setShowModal(false);
    setSelectedProductId(null);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setSelectedProductId(null);
  };

  if (!products.length) {
    return (
      <div className={styles.notFound}>
        <i className={`bi bi-cart4 ${styles.emptyCartIcon}`} />
        <h3>No products found</h3>
      </div>
    );
  }

  return (
    <>
      <Row xs={1} sm={2} md={2} lg={3} xl={4} xxl={5} className={styles.productGrid}>
        {products.map((product) => (
          <Col key={product.id}>
            <Card className={styles.productCard}>
              <div className={styles.imageWrapper}>
                <Card.Img
                  variant="top"
                  src={product.imageUrl || '/images/placeholder_img.png'}
                  alt={product.title}
                  className={styles.productImg}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/placeholder_img.png';
                  }}
                />
              </div>

              <Card.Body className={styles.cardBody}>
                <h5 className={styles.productTitle}>{product.title}</h5>
                <h6 className={styles.productPrice}>₹{product.price}</h6>

                <div className={styles.btnGroup}>
                  <Button
                    className={styles.editBtn}
                    onClick={() => onEdit(product)}
                  >
                    Edit
                  </Button>

                  <Button
                    className={styles.deleteBtn}
                    onClick={() => handleDeleteClick(product.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        show={showModal}
        onHide={handleCancelDelete}
        centered
        className={styles.deleteModal}
      >
        <Button
          className={cx(styles.actionBtn, styles.closeBtn)}
          onClick={handleCancelDelete}
        >
          <i className="bi bi-x-lg" />
        </Button>

        <Modal.Body>
          <i className={`bi bi-exclamation-triangle ${styles.warningIcon}`} />
          <p>Are you sure you want to delete this product?<br />This action cannot be undone.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            className={cx(styles.actionBtn, styles.cancel)}
            onClick={handleCancelDelete}
          >
            No
          </Button>

          <Button
            className={cx(styles.actionBtn, styles.delete)}
            onClick={handleConfirmDelete}
          >
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductGrid;
