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
  const [rating, setRating] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [stocks, setStocks] = useState("");
  const [images, setImages] = useState([]);
  const [specs, setSpecs] = useState([]);
  const [specsKey, setSpecsKey] = useState("");
  const [specsValue, setSpecsValue] = useState("");
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

  const handleAddSpecs = () => {
    if (specsKey && specsValue) {
      setSpecs([...specs, { key: specsKey, value: specsValue }]);
      setSpecsKey("");
      setSpecsValue("");
    }
  };

  const handleRemoveSpecs = (index) => {
    const newSpecs = specs.filter((_, i) => i !== index);
    setSpecs(newSpecs);
  };

  const validate = () => {
    const newErrors = {};
    if (!productName) newErrors.productName = "Product Name is required";
    if (!productDescription)
      newErrors.productDescription = "Product Description is required";
    if (!price) newErrors.price = "Price is required";
    if (!offer) newErrors.offer = "Offer is required";
    if (!rating) newErrors.rating = "Rating is required";
    if (!productCategory)
      newErrors.productCategory = "Product Category is required";
    if (!stocks) newErrors.stocks = "Stocks is required";
    if (images.length < 1) newErrors.images = "At least one image is required";
    if (specs.length < 1) newErrors.specs = "At least one specs is required";
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
    formData.append("rating", rating);
    formData.append("productCategory", productCategory);
    formData.append("stocks", stocks);
    images.forEach((image, index) => {
      formData.append("images", image);
    });
    formData.append("speciality", speciality);
    const specsFormatted = specs
      .map((spec) => `${spec.key}:${spec.value}`)
      .join(",");
    formData.append("specs", specsFormatted);

    try {
      const response = await uploadProduct(formData).unwrap();

      toast({ title: response.message });
      setProductName("");
      setProductDescription("");
      setPrice("");
      setOffer("");
      setRating("");
      setProductCategory("");
      setStocks("");
      setImages([]);
      setSpecs([]);
      setSpeciality("");
      setErrors({});
      onSuccess();
    } catch (error) {
      toast({
        variant: "destructive",
        description: err.data.message || "error occured",
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
        <div className="element">
          <Label>Rating</Label>
          <Input
            placeholder="Rating"
            className="mb-2"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          {errors.rating && (
            <p className="text-red-500 text-xs">{errors.rating}</p>
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
      <div className="flex flex-col mb-2">
        <Label>Specs</Label>
        <div className="element flex items-center mt-1">
          <Input
            placeholder="Key"
            className="mb-2"
            value={specsKey}
            onChange={(e) => setSpecsKey(e.target.value)}
          />
          <span className="mx-1 mb-2">:</span>
          <Input
            placeholder="Value"
            className="mb-2 mr-1"
            value={specsValue}
            onChange={(e) => setSpecsValue(e.target.value)}
          />
          <button
            type="button"
            className="bg-[#4e1b61] text-sm text-white px-3 py-2.5 w-96 mb-2 rounded"
            onClick={handleAddSpecs}
          >
            Add Specs
          </button>
        </div>
        <div className="flex flex-wrap">
          {specs.map((item, index) => (
            <div key={index} className="relative m-2 p-2 border rounded">
              <span className=" text-sm">
                {item.key} : {item.value}
              </span>
              <button
                type="button"
                className="absolute top-0 right-0 text-red-500"
                onClick={() => handleRemoveSpecs(index)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        {errors.specs && <p className="text-red-500 text-xs">{errors.specs}</p>}
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
