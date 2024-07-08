"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/user/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Page = () => {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("Customer Name");
  const [email, setEmail] = useState("Customer Email");
  const [phone, setPhone] = useState("123456789");
  const [newAddress, setNewAddress] = useState({
    address: "",
    pincode: "",
    city: "",
    state: "",
    country: ""
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [savedAddress, setSavedAddress]= useState([]);

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleAddressChange = (e) => {
    const { id, value } = e.target;
    setNewAddress((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSaveAddress = () => {
    if(
      !newAddress.address ||
      !newAddress.pincode ||
      !newAddress.city ||
      !newAddress.state ||
      !newAddress.country
    ){
      alert("Please fill out all the field")
      return;
    }
    setSavedAddress([...savedAddress,newAddress])
    // Clear the address form after saving
    setNewAddress({
      address: "",
      pincode: "",
      city: "",
      state: "",
      country: ""
    });
    setIsDialogOpen(false); // Close the dialog
  };

  return (
    <>
      <div className="flex justify-center my-11">
        <Avatar className="size-lg">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="personal-detail w-1/2 mx-auto">
        <Header title="Customer Profile" />
        <div className="grid grid-cols-2 gap-6 p-4">
          <div className="col-span-1">
            <Label className="block text-sm font-medium text-gray-700">
              Name
            </Label>
            <div className="relative">
              <Input
                type="text"
                value={name}
                readOnly={!edit}
                className="mt-1 block w-full p-2 pr-10 border-0 border-b sm:text-sm outline-none"
                onChange={(e) => setName(e.target.value)}
              />
              <Button
                onClick={handleEdit}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent p-0"
              >
                <Pen className="w-4 h-4 text-gray-600" />
              </Button>
            </div>
          </div>
          <div className="col-span-1">
            <Label className="block text-sm font-medium text-gray-700">
              Email
            </Label>
            <div className="relative">
              <Input
                type="email"
                value={email}
                readOnly={!edit}
                className="mt-1 block w-full p-2 pr-10 border-0 border-b sm:text-sm outline-none"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent p-0"
                onClick={handleEdit}
              >
                <Pen className="w-4 h-4 text-gray-600" />
              </Button>
            </div>
          </div>
          <div className="col-span-1">
            <Label className="block text-sm font-medium text-gray-700">
              Phone Number
            </Label>
            <div className="relative">
              <Input
                type="number"
                value={phone}
                readOnly={!edit}
                className="mt-1 block w-full p-2 pr-10 border-0 border-b sm:text-sm outline-none"
                onChange={(e) => setPhone(e.target.value)}
              />
              <Button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent p-0"
                onClick={handleEdit}
              >
                <Pen className="w-4 h-4 text-gray-600" />
              </Button>
            </div>
          </div>
        </div>
        {edit && (
          <div className="col-span-1">
            <Button onClick={handleEdit}>SAVE</Button>
          </div>
        )}
      </div>
      <div className="w-1/2 mx-auto">
      <hr className="mt-9 mb-3"/>
        <div className="flex">
          <Header title="Saved Addresses" className=" mt-9" />
          <div className="mt-6 ml-9">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setIsDialogOpen(true)}>Add Address</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-yellow-50">
                <DialogHeader>
                  <DialogTitle>New Address</DialogTitle>
                  <DialogDescription>
                    Add a New Address And Click Save When Done
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="address" className="text-right">
                      Address
                    </Label>
                    <Input
                      id="address"
                      value={newAddress.address}
                      onChange={handleAddressChange}
                      className="col-span-3"
                      placeholder="Enter Full Address"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="pincode" className="text-right">
                      Pincode
                    </Label>
                    <Input
                      id="pincode"
                      value={newAddress.pincode}
                      onChange={handleAddressChange}
                      className="col-span-3"
                      type="text"
                      placeholder="Your Pincode"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="city" className="text-right">
                      City
                    </Label>
                    <Input
                      id="city"
                      value={newAddress.city}
                      onChange={handleAddressChange}
                      className="col-span-3"
                      type="text"
                      placeholder="Your City"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="state" className="text-right">
                      State
                    </Label>
                    <Input
                      id="state"
                      value={newAddress.state}
                      onChange={handleAddressChange}
                      className="col-span-3"
                      type="text"
                      placeholder="Your State"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="country" className="text-right">
                      Country
                    </Label>
                    <Input
                      id="country"
                      value={newAddress.country}
                      onChange={handleAddressChange}
                      className="col-span-3"
                      type="text"
                      placeholder="Your Country"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleSaveAddress}>
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="flex mt-3">
          <RadioGroup defaultValue="option-one">
            {savedAddress.map((address,index)=>(

            <div key={index} className="flex space-x-2 mb-2">
              <div className="add-1 border">
                <Label htmlFor={`option-${index}`} className="w-full h-full">
                  {`${address.address},${address.city},${address.pincode},${address.state},${address.country}`}
                </Label>
              </div>
              <RadioGroupItem value={`option-${index}`} id={`option-${index}`} />
            </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    </>
  );
};

export default Page;
