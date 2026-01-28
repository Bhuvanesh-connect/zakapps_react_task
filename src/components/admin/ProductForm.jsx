import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import styles from './../admin/admin.module.scss';

const ProductForm = ({ title, submitText, onSubmit, initialEditData }) => {
  const [initialSnapshot, setInitialSnapshot] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    imageUrl: '',
    category: '',
    description: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialEditData) {
      let {title, price, imageUrl, category, description} = initialEditData;

      let initialData = {
        title: title || '',
        price: price || 0,
        imageUrl: imageUrl || '',
        category: category || '',
        description: description || '',
      }

      setFormData(initialData);
      setInitialSnapshot(initialData);
    }
  }, [initialEditData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => (
      { ...prev, 
        [name]: value 
      }
    ));
    setErrors((prev) => (
      { ...prev, 
        [name]: '' 
      }
    ));
  };

  const validate = () => {
      const newErrors = {};

      if (!formData.title.trim()) {
        newErrors.title = 'Title is required';
      } else if (formData.title.trim().length < 3) {
        newErrors.title = 'Title must be at least 3 characters';
      }

      const price = Number(formData.price);
      if (!formData.price) {
        newErrors.price = 'Price is required';
      } else if (price <= 0) {
        newErrors.price = 'Price must be greater than 0';
      }

      if (!formData.imageUrl?.trim()) {
        newErrors.imageUrl = 'Image URL is required';
      } else {
        try {
          new URL(formData.imageUrl);
        } catch {
          newErrors.imageUrl = 'Enter a valid image URL';
        }
      }

      if (!formData.category) {
        newErrors.category = 'Please select a category';
      }

      if (!formData.description?.trim()) {
        newErrors.description = 'Description is required';
      } else if (formData.description.trim().length < 10) {
        newErrors.description = 'Description must be at least 10 characters';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      title: '',
      price: '',
      imageUrl: '',
      category: '',
      description: '',
    });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const success = await onSubmit(formData);
    if (success && !initialEditData) {
      resetForm();
    }
  };

  const isChanged = initialEditData ? Object.keys(formData).some((key) => String(formData[key]) !== String(initialSnapshot?.[key])): true;

  return (
    <div className={styles.formCard}>
      <div className={styles.header}>
        <h5>{title}</h5>
      </div>

      <Form
        onSubmit={handleSubmit}
        className={styles.productForm}
        autoComplete="off"
      >
        <Form.Group className={styles.formGroup}>
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter Title"
            isInvalid={!!errors.title}
          />
          <Form.Control.Feedback type="invalid">
            {errors.title}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className={styles.formGroup}>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter Price"
            isInvalid={!!errors.price}
            className={styles.priceInput}
          />
          <Form.Control.Feedback type="invalid">
            {errors.price}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className={styles.formGroup}>
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Enter Image URL"
            isInvalid={!!errors.imageUrl}
          />
          <Form.Control.Feedback type="invalid">
            {errors.imageUrl}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className={styles.formGroup}>
          <Form.Label>Category</Form.Label>
          <Form.Select
            name="category"
            value={formData.category}
            onChange={handleChange}
            isInvalid={!!errors.category}
          >
            <option value="">Select category</option>
            <option value="electronics">Electronic Appliances & Gadgets</option>
            <option value="fashion">Fashion</option>
            <option value="furniture">Furniture</option>
            <option value="accessories">Accessories</option>
            <option value="men">For Men</option>
            <option value="women">For Women</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.category}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className={styles.formGroup}>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter Description"
            isInvalid={!!errors.description}
          />
          <Form.Control.Feedback type="invalid">
            {errors.description}
          </Form.Control.Feedback>
        </Form.Group>

        <div className={styles.btnRow}>
          <Button
            type="submit"
            className={styles.saveBtn}
            disabled={!isChanged}
          >
            {submitText}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ProductForm;
