"use client";
import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from "@/components/user/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pen, Trash } from "lucide-react";
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
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/common/authSlice";
import { useRouter } from "next/navigation";


const Page = () => {
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPhone, setEditPhone] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [newAddress, setNewAddress] = useState({
    address: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [savedAddress, setSavedAddress] = useState([]);
  const [data, setData] = useState(null);

  // const dispatch = useDispatch();
  // const router = useRouter();
  // const handleLogout = () => {
  //   dispatch(logout());
  //   router.push("/");
  // };

  useEffect(() => {
    const storedData = localStorage.getItem('userdata');
    console.log('Stored Data:', storedData); // Log the raw stored data
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      console.log('Parsed Data:', parsedData); // Log the parsed data
      setData(parsedData);
      setName(parsedData.email || ''); // Assuming name and email are the same in this context
      setEmail(parsedData.email || '');
      setPhone(parsedData.phoneNumber || ''); // Adjusted key name
    }
  }, []);
  

  const handleEditName = () => {
    setEditName(!editName);
  };

  const handleEditEmail = () => {
    setEditEmail(!editEmail);
  };

  const handleEditPhone = () => {
    setEditPhone(!editPhone);
  };

  const handleEdit = () => {
    if (editName) {
      setEditName(false);
    }
    if (editEmail) {
      setEditEmail(false);
    }
    if (editPhone) {
      if (validatePhone(phone)) {
        setEditPhone(false);
        setPhoneError("");
      } else {
        setPhoneError("Invalid phone number. Must be 10 digits.");
      }
    }
    // Save the updated data back to local storage
    const updatedData = {
      ...data,
      name: name,
      email: email,
      phone: phone,
    };
    console.log("Updated Data:", updatedData); // Debug log
    localStorage.setItem("userdata", JSON.stringify(updatedData));
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleAddressChange = (e) => {
    const { id, value } = e.target;
    setNewAddress((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSaveAddress = () => {
    if (
      !newAddress.address ||
      !newAddress.pincode ||
      !newAddress.city ||
      !newAddress.state ||
      !newAddress.country
    ) {
      alert("Please fill out all the fields");
      return;
    }
    setSavedAddress([...savedAddress, newAddress]);
    setNewAddress({
      address: "",
      pincode: "",
      city: "",
      state: "",
      country: "",
    });
    setIsDialogOpen(false);
  };

  const handleDeleteAddress = (index) => {
    setSavedAddress(savedAddress.filter((_, i) => i !== index));
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
                readOnly={!editName}
                className="mt-1 block w-full p-2 pr-10 border-0 border-b sm:text-sm outline-none"
                onChange={(e) => setName(e.target.value)}
              />
              <Button
                onClick={handleEditName}
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
                readOnly={!editEmail}
                className="mt-1 block w-full p-2 pr-10 border-0 border-b sm:text-sm outline-none"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent p-0"
                onClick={handleEditEmail}
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
                type="text"
                value={phone}
                readOnly={!editPhone}
                className="mt-1 block w-full p-2 pr-10 border-0 border-b sm:text-sm outline-none"
                onChange={(e) => setPhone(e.target.value)}
              />
              <Button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent p-0"
                onClick={handleEditPhone}
              >
                <Pen className="w-4 h-4 text-gray-600" />
              </Button>
              {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
            </div>
          </div>
        </div>
        {(editName || editEmail || editPhone) && (
          <div className="col-span-1">
            <Button onClick={handleEdit}>SAVE</Button>
          </div>
        )}
      </div>
      <div className="w-1/2 mx-auto">
        <hr className="mt-9 mb-3 border-t-2" style={{ borderColor: "rgb(78 27 97" }} />
        <div className="flex flex-wrap">
          <Header title="Saved Addresses" className="mt-9" />
          <div className="mt-6 ml-9">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setIsDialogOpen(true)}>Add Address</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                  <DialogTitle>New Address</DialogTitle>
                  <DialogDescription>
                    Add a New Address And Click Save When Done
                  </DialogDescription>
                </DialogHeader>
                <div>
                  <Label htmlFor="address">Address*</Label>
                  <Input
                    id="address"
                    value={newAddress.address}
                    onChange={handleAddressChange}
                    className="mt-1"
                    placeholder="Enter Full Address"
                    type="text-area"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="gap-4">
                    <Label htmlFor="pincode">Pincode*</Label>
                    <Input
                      id="pincode"
                      value={newAddress.pincode}
                      onChange={handleAddressChange}
                      className="mt-1"
                      type="text"
                      placeholder="Your Pincode"
                      pattern="\d{6}"
                      maxLength="6"
                    />
                  </div>
                  <div className="gap-4">
                    <Label htmlFor="city" className="text-right">
                      City*
                    </Label>
                    <Input
                      id="city"
                      value={newAddress.city}
                      onChange={handleAddressChange}
                      className="mt-1"
                      type="text"
                      placeholder="Your City"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-right">
                      State*
                    </Label>
                    <Input
                      id="state"
                      value={newAddress.state}
                      onChange={handleAddressChange}
                      className="mt-1"
                      type="text"
                      placeholder="Your State"
                    />
                  </div>
                  <div>
                    <Label htmlFor="country" className="text-right">
                      Country*
                    </Label>
                    <Input
                      id="country"
                      value={newAddress.country}
                      onChange={handleAddressChange}
                      className="mt-1"
                      type="text"
                      placeholder="Your Country"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleSaveAddress}>
                    Add Address
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="mt-3 mb-5">
          <RadioGroup defaultValue="primary">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-wrap items-center border-2 rounded-sm sm:text-sm p-2">
                <RadioGroupItem value="primary" id="primary" className="mr-auto" />
                <div className="add-1 flex-grow flex-col w-full ml-4">
                  <Label htmlFor="primary" className="w-full break-words">
                    Primary Address Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, laudantium.
                  </Label>
                </div>
              </div>
              {savedAddress.map((address, index) => (
                <div key={index} className="flex flex-wrap items-center border-2 sm:text-sm p-2 w-full">
                  <RadioGroupItem value={`option-${index}`} id={`option-${index}`} className="mr-auto" />
                  <div className="add-1 flex flex-col w-full p-2 ml-4">
                    <div>
                      <Label htmlFor={`option-${index}`} className="w-full break-words">
                        {`${address.address}`}
                      </Label>
                    </div>
                    <div>
                      <Label htmlFor={`option-${index}`} className="w-full break-words">
                        {`${address.city}, ${address.pincode}`}
                      </Label>
                    </div>
                    <div>
                      <Label htmlFor={`option-${index}`} className="w-full break-words">
                        {`${address.state}, ${address.country}`}
                      </Label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
      </div>
    </>
  );
};

export default Page;
