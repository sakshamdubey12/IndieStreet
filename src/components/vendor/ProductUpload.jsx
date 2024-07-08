import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useGetProductCategoryQuery } from "@/redux/slices/admin/ProductCategorySlice";
import { useUploadProductMutation } from "@/redux/slices/vendor/ProductUpload";

const ProductUpload = ({ onSuccess }) => {
  const { toast } = useToast();
  const { data: categoryData } = useGetProductCategoryQuery();

  const [uploadProduct] = useUploadProductMutation();
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [price, setPrice] = useState("");
  const [offer, setOffer] = useState("");

  const [productCategory, setProductCategory] = useState("");
  const [stocks, setStocks] = useState("");
  const [images, setImages] = useState([]);
  const [weight, setWeight] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [errors, setErrors] = useState({});

  const handleImageChange = (e) => {
    if (images.length < 5) {
      const file = e.target.files[0];
      setImages([...images, file]);
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const handleAddWeight = () => {
    if (weight) {
      setWeight(weight);
      setWeight("");
    }
  };

  const handleRemoveWeight = (index) => {
    setWeight("");
  };

  const validate = () => {
    const newErrors = {};
    if (!productName) newErrors.productName = "Product Name is required";
    if (!productDescription)
      newErrors.productDescription = "Product Description is required";
    if (!price) newErrors.price = "Price is required";
    if (!offer) newErrors.offer = "Offer is required";
    if (!productCategory)
      newErrors.productCategory = "Product Category is required";
    if (!stocks) newErrors.stocks = "Stocks is required";
    if (images.length < 1) newErrors.images = "At least one image is required";
    if (!weight) newErrors.weight = "Weight is required";
    if (!speciality) newErrors.speciality = "Speciality is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", productDescription);
    formData.append("price", price);
    formData.append("offer", offer);
    formData.append("productCategory", productCategory);
    formData.append("stocks", stocks);
    images.forEach((image, index) => {
      formData.append("images", image);
    });
    formData.append("speciality", speciality);
    formData.append("weight", weight);

    try {
      const response = await uploadProduct(formData).unwrap();
      toast({ title: response.message });
      setProductName("");
      setProductDescription("");
      setPrice("");
      setOffer("");
      setProductCategory("");
      setStocks("");
      setImages([]);
      setWeight("");
      setSpeciality("");
      setErrors({});
      onSuccess();
    } catch (error) {
      toast({
        variant: "destructive",
        description: err.data.message || "error occurred",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="element">
        <Label>Product Name</Label>
        <Input
          placeholder="Enter Product Name"
          className="mb-2"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        {errors.productName && (
          <p className="text-red-500 text-xs">{errors.productName}</p>
        )}
      </div>
      <div className="element">
        <Label>Product Description</Label>
        <Textarea
          placeholder="Enter Product Description"
          className="mb-2"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        />
        {errors.productDescription && (
          <p className="text-red-500 text-xs">{errors.productDescription}</p>
        )}
      </div>
      <div className="flex">
        <div className="element mr-1">
          <Label>Price</Label>
          <Input
            placeholder="Price"
            className="mb-2"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {errors.price && (
            <p className="text-red-500 text-xs">{errors.price}</p>
          )}
        </div>
        <div className="element mr-1">
          <Label>Offer</Label>
          <Input
            placeholder="Offer"
            className="mb-2"
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
          />
          {errors.offer && (
            <p className="text-red-500 text-xs">{errors.offer}</p>
          )}
        </div>
        <div className="element mr-1">
          <Label>Photos</Label>
          <Input
            placeholder="Photos"
            accept=".png, .jpg, .jpeg"
            type="file"
            className="mb-2"
            onChange={handleImageChange}
          />
          {errors.images && (
            <p className="text-red-500 text-xs">{errors.images}</p>
          )}
        </div>

      </div>
      <div className="flex flex-wrap">
        {images.map((image, index) => (
          <div key={index} className="relative m-2">
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="w-20 h-20 object-cover"
            />
            <button
              type="button"
              className="absolute top-0 right-0 text-red-500"
              onClick={() => handleRemoveImage(index)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <div className="element mb-2">
        <Label>Speciality</Label>
        <Select onValueChange={setSpeciality}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Speciality" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectGroup>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="hots">Hots</SelectItem>
              <SelectItem value="trending">Trending</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {errors.speciality && (
          <p className="text-red-500 text-xs">{errors.speciality}</p>
        )}
      </div>
      <div className="element mb-2">
        <Label>Weight (in KG)</Label>
        <Input
          placeholder="Weight in KG"
          className="mb-2"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        {errors.weight && (
          <p className="text-red-500 text-xs">{errors.weight}</p>
        )}
      </div>
      <div className="flex mb-2">
        <div className="element mr-1 w-1/2">
          <Label>Product Category</Label>
          <Select onValueChange={setProductCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Product Category" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectGroup>
                {Array.isArray(categoryData?.data) &&
                  categoryData.data.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.categoryName}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.productCategory && (
            <p className="text-red-500 text-xs">{errors.productCategory}</p>
          )}
        </div>
        <div className="element w-1/2">
          <Label>Stocks</Label>
          <Input
            placeholder="Stocks"
            className="mb-2"
            value={stocks}
            onChange={(e) => setStocks(e.target.value)}
          />
          {errors.stocks && (
            <p className="text-red-500 text-xs">{errors.stocks}</p>
          )}
        </div>
      </div>
      <Button type="submit" className=" w-full">
        Add Product
      </Button>
    </form>
  );
};

export default ProductUpload;
