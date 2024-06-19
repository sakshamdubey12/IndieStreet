"use client";
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "../ui/use-toast";

const DisplayTable = ({
  get,
  delete: deleteCategoryHook,
  update,
  inactive,
}) => {
  const [businessCategory, setBusinessCategory] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [currentCategoryName, setCurrentCategoryName] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [dialogType, setDialogType] = useState("");
  const { toast } = useToast();

  // Fetch categories
  const { data, error, isLoading, refetch } = get();
  const [deleteCategory, { isLoading: isDeleting }] = deleteCategoryHook();
  const [updateCategory, { isLoading: isUpdating }] = update();
  const [markCategoryInactive, { isLoading: isInactivating }] = inactive();

  useEffect(() => {
    if (data) {
      setBusinessCategory(data.data);
    }
  }, [data]);

  const openDialog = (type, categoryId, categoryName = "") => {
    setSelectedCategoryId(categoryId);
    setDialogType(type);
    setCurrentCategoryName(categoryName);
  };

  const handleUpdateCategory = async () => {
    if (!selectedCategoryId) return;

    try {
      await updateCategory({
        categoryId: selectedCategoryId,
        categoryName: newCategoryName,
      }).unwrap();
      toast({
        title: "Success",
        description: "Category successfully updated",
        duration: 3000,
      });
      refetch();
      setDialogType("");
    } catch (error) {
      console.error("Failed to update category:", error);
      toast({
        title: "Error",
        description: "Failed to update category",
        duration: 3000,
      });
    }
  };

  const handleMarkCategoryInactive = async () => {
    if (!selectedCategoryId) return;
    console.log(selectedCategoryId);
    try {
      await markCategoryInactive(selectedCategoryId).unwrap();
      toast({
        title: "Success",
        description: "Category successfully marked inactive",
        duration: 3000,
      });
      refetch();
      setDialogType("");
    } catch (error) {
      console.error("Failed to mark category inactive:", error);
      toast({
        title: "Error",
        description: "Failed to mark category inactive",
        duration: 3000,
      });
    }
  };

  const handleDeleteCategory = async () => {
    if (!selectedCategoryId) return;

    try {
      await deleteCategory(selectedCategoryId).unwrap();
      toast({
        title: "Success",
        description: "Category successfully deleted",
        duration: 3000,
      });
      refetch();
      setDialogType("");
    } catch (error) {
      console.error("Failed to delete category:", error);
      toast({
        title: "Error",
        description: "Failed to delete category",
        duration: 3000,
      });
    }
  };

  const closeDialog = () => {
    setDialogType("");
    setSelectedCategoryId(null);
    setCurrentCategoryName("");
    setNewCategoryName("");
  };

  if (error) {
    return <p>Error loading data</p>;
  }

  return (
    <>
      <Table className="border rounded">
        <TableHeader>
          <TableRow>
            <TableHead>Category Name</TableHead>
            <TableHead>Active Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {businessCategory.map((category) => (
            <TableRow key={category._id}>
              <TableCell>{category.categoryName}</TableCell>
              <TableCell>{category.isActive ? "Active" : "Inactive"}</TableCell>
              <TableCell>
                {new Date(category.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell>
                {new Date(category.updatedAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger className="bg-white p-2 outline-none rounded-full">
                    <BsThreeDotsVertical className="text-base text-gray-600" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white">
                    <DropdownMenuItem
                      onClick={() =>
                        openDialog(
                          "update",
                          category._id,
                          category.categoryName
                        )
                      }
                    >
                      Update
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => openDialog("inactive", category._id)}
                    >
                      Inactive
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => openDialog("delete", category._id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Update Dialog */}
      <Dialog open={dialogType === "update"} onOpenChange={closeDialog}>
        <DialogContent className=" bg-white">
          <DialogHeader>
            <DialogTitle>Update Category</DialogTitle>
          </DialogHeader>
          <div>
            <label className=" text-sm">Current Category Name</label>
            <Input value={currentCategoryName} disabled />
          </div>
          <div>
            <label className=" text-sm">New Category Name</label>
            <Input
              placeholder="Enter new category name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button className=" bg-white text-black" onClick={closeDialog}>
              Cancel
            </Button>
            <Button onClick={handleUpdateCategory} disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Inactive Dialog */}
      <Dialog open={dialogType === "inactive"} onOpenChange={closeDialog}>
        <DialogContent className=" bg-white">
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to mark this category inactive?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button className=" bg-white text-black" onClick={closeDialog}>
              Cancel
            </Button>
            <Button
              onClick={handleMarkCategoryInactive}
              disabled={isInactivating}
            >
              {isInactivating ? "Inactivating..." : "Inactive"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={dialogType === "delete"} onOpenChange={closeDialog}>
        <DialogContent className=" bg-white">
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this category?
            </DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button variant="destructive" onClick={closeDialog}>
              Cancel
            </Button>
            <Button onClick={handleDeleteCategory} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DisplayTable;
