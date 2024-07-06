// components/vendor/DisplayTable.js
"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetAllProductsQuery } from "@/redux/slices/vendor/ProductUpload";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { BsTrash } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { deleteProduct, toggleIsActive } from "@/redux/slices/vendor/manageProduct";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const DisplayTable = () => {
  const { data, error, isLoading, refetch } = useGetAllProductsQuery();
  const [products, setProducts] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const refetchTrigger = useSelector((state) => state.dialog.refetch);
  const dispatch = useDispatch();
  const route = useRouter()
  useEffect(() => {
    if (data && data.success) {
      setProducts(data.products);
    }
  }, [data]);
  useEffect(() => {
    refetch();
  }, [refetchTrigger]);

  const handleViewDetail = (e,product) => {
  e.preventDefault()
  route.push(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/vendor/products/${product._id}`)
  };
  useEffect(() => {
    const fetchProducts = async () => {
      if (data && data.success) {
        setProducts(data.products);
      }
    };
    fetchProducts();
  }, [dispatch]);
  const parseSpecs = (specsString) => {
    return specsString.split(",").map((spec) => {
      const [key, value] = spec.split(":");
      return { key: key.trim(), value: value.trim() };
    });
  };
  const { status, err  } = useSelector((state) => state.product);

  const handleToggle = async (productId) => {
    console.log(productId);
    const result = await dispatch(toggleIsActive(productId));
    console.log(result);
    if (toggleIsActive.fulfilled.match(result)) {
      toast.success(result.payload.message);
    } else {
      toast.error(result?.error.message || 'Error occurred');
    }
  };

  const handleDelete = async (productId) => {
    const result = await dispatch(deleteProduct(productId));
    if (deleteProduct.fulfilled.match(result)) {
      toast.success(result.payload.message);
    } else {
      toast.error(result.payload.message || 'Error occurred');
    }
  };

  return (
    <>
      <Table className="border rounded">
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Product Category</TableHead>
            <TableHead>Stocks</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Offer</TableHead>
            <TableHead>Offer Price</TableHead>
            <TableHead>Actions </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => 
          
          (
            <TableRow key={product.name}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.productCategory}</TableCell>
              <TableCell>{product.stocks}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.offer}</TableCell>
              <TableCell>{product.offeredPrice}</TableCell>
              <TableCell>

          
                      <Button onClick={(e)=>handleDelete(product._id)} >
                   Delete
                      </Button>

                      <Button className="mx-3" onClick={(e)=>handleToggle(product._id)} >
                        {product.isActive?"Active" :"Inactive"}
                      </Button>
                
              </TableCell>
              <TableCell>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <Button onClick={(e) => handleViewDetail(e,product)}>
                    View & Update
                  </Button>
                  <DialogContent className="bg-white max-w-2xl max-h-[80vh] overflow-y-auto scroll">
                    <DialogHeader>
                      <DialogTitle className="text-2xl mb-2">
                        Product Detail
                      </DialogTitle>
                    </DialogHeader>
                    {selectedProduct && (
                      <form>
                        <div className="element">
                          <Label>Product Name</Label>
                          <Input
                            placeholder="Enter Product Name"
                            className="mb-2"
                            value={selectedProduct.name}
                            disabled
                          />
                        </div>
                        <div className="element">
                          <Label>Product Description</Label>
                          <Textarea
                            placeholder="Enter Product Description"
                            className="mb-2"
                            disabled
                            value={selectedProduct.description}
                          />
                        </div>
                        <div className="flex">
                          <div className="element mr-1">
                            <Label>Price</Label>
                            <Input
                              placeholder="Price"
                              className="mb-2"
                              value={selectedProduct.price}
                              disabled
                            />
                          </div>
                          <div className="element mr-1">
                            <Label>Offer</Label>
                            <Input
                              placeholder="Offer"
                              className="mb-2"
                              value={selectedProduct.offer}
                              disabled
                            />
                          </div>
                          <div className="element">
                            <Label>Rating</Label>
                            <Input
                              placeholder="Rating"
                              className="mb-2"
                              value={selectedProduct.rating}
                              disabled
                            />
                          </div>
                        </div>
                        <div className="flex flex-wrap">
                          {selectedProduct.images.map((image, index) => (
                            <div key={index} className="relative m-2">
                              <img
                                src={image}
                                alt={`Product Image ${index + 1}`}
                                className="w-20 h-20 object-cover"
                              />
                            </div>
                          ))}
                        </div>
                        <div className="element mb-2">
                          <Label>Speciality</Label>
                          <Select value={selectedProduct.speciality} disabled>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Speciality" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                              <SelectGroup>
                                <SelectItem value="featured">
                                  Featured
                                </SelectItem>
                                <SelectItem value="hots">Hots</SelectItem>
                                <SelectItem value="trending">
                                  Trending
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-col mb-2">
                          <Label>Specs</Label>
                          <div className="flex flex-wrap">
                            {parseSpecs(selectedProduct.specs[0]).map(
                              (item, index) => (
                                <div
                                  key={index}
                                  className="relative m-2 p-2 border rounded"
                                >
                                  <span className="text-xs">
                                    {item.key} : {item.value}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                        <div className="flex mb-2">
                          <div className="element mr-1 w-1/2">
                            <Label>Product Category</Label>
                            <Input
                              placeholder={selectedProduct.productCategory}
                              className="mb-2"
                              disabled
                            />
                          </div>
                          <div className="element w-1/2">
                            <Label>Stocks</Label>
                            <Input
                              placeholder={selectedProduct.stocks}
                              className="mb-2"
                              disabled
                            />
                          </div>
                        </div>
                      </form>
                    )}
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default DisplayTable;
