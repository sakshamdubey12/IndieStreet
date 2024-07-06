"use client"
import { fetchCategories, fetchProductById, updateProduct } from '@/redux/slices/vendor/manageProduct';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ProductUpdate = ({params}) => {
console.log(params.productId);
  const productId = params.productId;
  const dispatch = useDispatch();
  const { product, categories, status, error } = useSelector((state) => state.product);
  console.log(categories);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stocks: '',
    offer: '',
    speciality: '',
    productCategory: '',
    images: [],
  });

  useEffect(() => {
    dispatch(fetchProductById(productId));
    dispatch(fetchCategories());
  }, [dispatch, productId]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        stocks: product.stocks,
        offer: product.offer,
        speciality: product.speciality,
        productCategory: product.productCategory,
        images: product.images,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e, index) => {
    const newImages = [...formData.images];
    newImages[index] = e.target.files[0];
    setFormData({
      ...formData,
      images: newImages,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(updateProduct({ productId, updatedData: formData }));
    if (updateProduct.fulfilled.match(result)) {
      toast.success('Product updated successfully');
    } else {
      toast.error(result.payload.message || 'Error occurred');
    }
  };
  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4 text-primary">Update Product</h1>
    {status === 'loading' && <p>Loading...</p>}
    {error && <p className="text-red-500">{error}</p>}
    {product && (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Stocks</label>
          <input
            type="number"
            name="stocks"
            value={formData.stocks}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Offer (%)</label>
          <input
            type="number"
            name="offer"
            value={formData.offer}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Speciality</label>
          <select
            name="speciality"
            value={formData.speciality}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          >
            <option value="">Select Speciality</option>
            <option value="hot">Hot</option>
            <option value="trending">Trending</option>
            <option value="featured">Featured</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="productCategory"
            value={formData.productCategory}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          >
            <option value="">Select Category</option>
            {categories.data?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Images</label>
          {formData.images.map((image, index) => (
            <div key={index} className="mt-2">
              <img src={image} alt={`Product ${index + 1}`} className="h-24 w-24 object-cover"/>
              <input
                type="file"
                onChange={(e) => handleImageChange(e, index)}
                className="block w-full mt-2"
                accept="image/*"
              />
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="bg-[#4e1b61] text-white px-4 py-2 rounded-md mt-4"
        >
          Save Changes
        </button>
      </form>
    )}
  </div>
);
};


export default ProductUpdate;
