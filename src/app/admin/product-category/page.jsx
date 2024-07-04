"use client";
import { useState } from "react";
import {
  useGetProductCategoryQuery,
  useAddProductCategoryMutation,
  useDeleteProductCategoryMutation,
  useUpdateProductCategoryMutation,
  useMarkProductCategoryInactiveMutation,
} from "@/redux/slices/admin/ProductCategorySlice";
import DisplayTable from "@/components/admin/DisplayTable";
import PageTitle from "@/components/common/PageTitle";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const Categories = (props) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data, refetch } = useGetProductCategoryQuery();
  const [addCategory, { isLoading, isError }] = useAddProductCategoryMutation();
  const { toast } = useToast();

  const handleCreateCategory = async (event) => {
    event.preventDefault();
    try {
      await addCategory({ categoryName, description: categoryDescription }).unwrap();
      toast({
        title: "Success",
        description: "Category created successfully",
        duration: 3000,
      });
      setCategoryName("");
      setCategoryDescription("");
      refetch(); // Refetch the data after successful submission
      setIsDialogOpen(false); // Close the dialog
    } catch (error) {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to create category",
        duration: 3000,
      });
      console.error("Failed to create category:", error);
    }
  };

  return (
    <section className="flex flex-col gap-5 w-full px-10 py-3">
      <PageTitle title="Product Category" />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            className="w-fit bg-[#4e1b61] text-white px-5 py-2 rounded"
            onClick={() => setIsDialogOpen(true)}
          >
            Create Category
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl mb-2">Create Category</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateCategory}>
            <Label htmlFor="categoryName">Product Category Name</Label>
            <Input
              id="categoryName"
              placeholder="Enter Category"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="mb-2"
              required
            />
            <Label htmlFor="categoryDescription">Product Category Description</Label>
            <Textarea
              id="categoryDescription"
              placeholder="Description"
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
              className="mb-2"
              required
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create"}
            </Button>
          </form>
          {isError && (
            <p className="text-red-500 text-xs mt-2">
              Failed to create category
            </p>
          )}
        </DialogContent>
      </Dialog>
      <DisplayTable
      category="product"
        get={useGetProductCategoryQuery}
        delete={useDeleteProductCategoryMutation}
        update={useUpdateProductCategoryMutation}
        inactive={useMarkProductCategoryInactiveMutation}
      />
    </section>
  );
};

export default Categories;
