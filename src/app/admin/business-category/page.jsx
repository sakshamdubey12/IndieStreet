"use client";
import { useState } from "react";
import {
  useAddCategoryMutation,
  useGetBusinessCategoryQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useMarkCategoryInactiveMutation,
} from "@/redux/slices/BusinessCategorySlice";
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

const Categories = (props) => {
  const [categoryName, setCategoryName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Manage dialog open state
  const { data: businessCategories, refetch } = useGetBusinessCategoryQuery();
  const [addCategory, { isLoading, isError }] = useAddCategoryMutation();
  const { toast } = useToast();

  const handleCreateCategory = async (event) => {
    event.preventDefault();
    try {
      await addCategory({ categoryName }).unwrap();
      toast({
        title: "Success",
        description: "Category created successfully",
        duration: 3000,
      });
      setCategoryName("");
      refetch();
      setIsDialogOpen(false); // Close the dialog on success
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create category",
        duration: 3000,
      });
      console.error("Failed to create category:", error);
    }
  };

  return (
    <section className="flex flex-col gap-5 w-full px-10 py-3">
      <PageTitle title="Business Category" />
      <Button
        className="w-fit bg-[#4e1b61] text-white px-5 py-2 rounded"
        onClick={() => setIsDialogOpen(true)}
      >
        Create Category
      </Button>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl mb-2">Create Category</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateCategory}>
            <Input
              placeholder="Enter Category"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="mb-2"
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
        get={useGetBusinessCategoryQuery}
        delete={useDeleteCategoryMutation}
        update={useUpdateCategoryMutation}
        inactive={useMarkCategoryInactiveMutation}
      />
    </section>
  );
};

export default Categories;
