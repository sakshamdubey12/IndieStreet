"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Header from "@/components/user/Header";
import {
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
  Trash2Icon,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "@/redux/slices/user/cartSlice";
import Link from "next/link";
import Image from "next/image";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  console.log(cartItems);
  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity({ id }));
  };
  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity({ id }));
  };
  const handleClear = () => {
    dispatch(clearCart());
  };
  const removeFromCartFn = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc + (item.price - (item.offer / 100) * item.price) * item.quantity,
    0
  );

  return (
    <div className=" max-w-8xl p-10 grid lg:grid-cols-3 grid-cols-1 gap-10 relative">
      <div className="cart-items col-span-2">
        {cartItems.length > 0 ? (
          <>
            <div className="cart-header flex justify-between items-center mb-3">
              <Header title="Cart" />
              <Button onClick={handleClear}>Clear Cart</Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow className="text-gray-600 uppercase">
                  <TableHead className="text-left">Product</TableHead>
                  <TableHead className="text-center max-w-36 w-36">Quantity</TableHead>
                  <TableHead className="text-right">Total Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.map((item) => {
                  const totalPrice =
                    (item.price - (item.offer / 100) * item.price) *
                    item.quantity;
                  return (
                    <TableRow key={item.id} className=" py-1 px-10">
                      <TableCell>
                        <div className="flex items-start">
                          <Image
                            width={1000}
                            height={1000}
                            src={item.images[0]}
                            alt={item.name}
                            className="w-16 h-16 mr-4"
                          />
                          <div className="">
                            <Link
                              href={`/product/${item.name
                                .toLowerCase()
                                .replace(" ", "-")}/${item.id}`}
                              className="font-semibold mb-1.5"
                            >
                              {item.name}
                            </Link>
                            <p className=" text-sm">
                              <span className="text-red-600 mr-2 font-medium">
                                &#x20b9;{" "}
                                {item.price - (item.offer / 100) * item.price}
                              </span>
                              <span className=" line-through">
                                &#x20b9; {item.price}
                              </span>
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="flex items-center max-w-36">
                        <Button
                          className=" !text-xl border border-[#4E1B61] h-10 w-10 rounded-r-none relative left-0.5"
                          onClick={() => {
                            if (item.quantity > 1) {
                              handleDecreaseQuantity(item.id);
                            }
                          }}
                        >
                          <MinusIcon />
                        </Button>
                        <Input
                          value={item.quantity}
                          readOnly
                          className="text-center w-12 rounded-none"
                        />
                        <Button
                          className=" !text-xl border border-[#4E1B61] h-10 w-10 rounded-l-none relative right-0.5"
                          onClick={() => {
                            handleIncreaseQuantity(item.id);
                          }}
                        >
                          <PlusIcon />
                        </Button>
                      </TableCell>
                      <TableCell className="">
                        <p className=" font-medium mb-2 text-right">
                          ₹ {totalPrice.toFixed(2)}
                        </p>
                        <Button
                          onClick={() => removeFromCartFn(item.id)}
                          variant="ghost"
                          className="hover:bg-transparent hover:border-gray-300 border border-gray-300 hover:text-gray-600 text-gray-600 font-normal h-9 text-sm relative float-right"
                        >
                          <Trash2Icon className=" h-4 w-4 mr-1 relative bottom-0.5" />
                          <span>Remove</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </>
        ) : (
          <>
            <div className="empty-cart py-36 text-center flex items-center justify-center">
              <p className=" text-7xl font-semibold text-[#4e1b6192] z-10">
                Cart Empty
              </p>
              <ShoppingCartIcon className=" text-[#cef52047] w-32 h-32 absolute z-0 mix-blend-saturation" />
            </div>
          </>
        )}
      </div>
      <div className="mt-4 p-4 border border-gray-200 rounded col-span-1 sticky top-32 h-fit">
        <div className="flex justify-between mb-2">
          <p className="font-medium">Subtotal:</p>
          <p>₹ {subtotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p className="font-medium">Discount:</p>
          <p>₹ 0</p>
        </div>
        <div className="flex justify-between mb-2">
          <p className="font-medium">IGST:</p>
          <p>₹ 0</p>
        </div>
        <div className="flex justify-between mb-2">
          <p className="font-medium">CGST:</p>
          <p>₹ 0</p>
        </div>
        <div className="flex justify-between mb-2">
          <p className="font-medium">Total Including GST:</p>
          <p>₹ {subtotal.toFixed(2)}</p>
        </div>
        <Button className="w-full rounded -mt-0.5" size="lg">
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
