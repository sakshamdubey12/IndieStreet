// components/vendor/Products.js
"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PageTitle from "@/components/common/PageTitle";
import { Button } from "@/components/ui/button";
import ProductUpload from "@/components/vendor/ProductUpload";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DisplayTable from "@/components/vendor/DisplayTable";
import { openDialog, closeDialog, triggerRefetch } from "@/redux/slices/dialogSlice";

const Products = () => {
  const dispatch = useDispatch();
  const isDialogOpen = useSelector((state) => state.dialog.isDialogOpen);

  return (
    <section className="flex flex-col gap-5 w-full px-10 py-3">
      <PageTitle title="Products" />
      <Button
        className="w-fit bg-[#4e1b61] text-white px-5 py-2 rounded"
        onClick={() => dispatch(openDialog())}
      >
        Add Product
      </Button>
      <Dialog open={isDialogOpen} onOpenChange={() => dispatch(closeDialog())}>
        <DialogContent className="bg-white max-w-2xl max-h-[80vh] overflow-y-auto scroll">
          <DialogHeader>
            <DialogTitle className="text-2xl mb-2">Add Product</DialogTitle>
          </DialogHeader>
          <ProductUpload
            onSuccess={() => {
              dispatch(closeDialog());
              dispatch(triggerRefetch());
            }}
          />
        </DialogContent>
      </Dialog>
      <DisplayTable />
    </section>
  );
};

export default Products;
