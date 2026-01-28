import { Row, Col, Form } from 'react-bootstrap';
import styles from './../products/products.module.scss';

const Filters = ({ filters, onChange }) => {
  const handleChange = (key, value) => {
    onChange(key, value);
  };

  return (
    <Row className={styles.filterRow}>
      <Col sm={9} md={6} lg={4} xl={3} xxl={3} xxxl={3}>
        <Form.Control
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => handleChange('search', e.target.value)}
          autoComplete="off"
        />
      </Col>

      <Col sm={4} md={6} lg={3} xl={2} xxl={2} xxxl={2}>
        <Form.Select
          value={filters.category}
          onChange={(e) => handleChange('category', e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="furniture">Furniture</option>
          <option value="accessories">Accessories</option>
        </Form.Select>
      </Col>

      <Col sm={4} md={6} lg={2} xl={2} xxl={2} xxxl={1}>
        <Form.Select
          value={filters.gender}
          onChange={(e) => handleChange('gender', e.target.value)}
          autoComplete="off"
        >
          <option value="">All Genders</option>
          <option value="men">For Men</option>
          <option value="women">For Women</option>
        </Form.Select>
      </Col>

      <Col sm={4} md={6} lg={3} xl={2} xxl={2} xxxl={2}>
        <Form.Select
          value={filters.sort}
          onChange={(e) => handleChange('sort', e.target.value)}
        >
          <option value="">Price: All</option>
          <option value="low-high">Price: Low → High</option>
          <option value="high-low">Price: High → Low</option>
          <option value="a-z">Name: A → Z</option>
          <option value="z-a">Name: Z → A</option>
        </Form.Select>
      </Col>
    </Row>
  );
};

export default Filters;
