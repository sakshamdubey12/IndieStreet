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
import { MinusIcon, PlusIcon, ShoppingCartIcon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "@/redux/slices/cartSlice";

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

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className=" max-w-8xl p-10 grid lg:grid-cols-3 grid-cols-1 gap-10 relative">
      <div className="cart-items col-span-2">
        {cartItems.length > 0 ? (
          <>
            <div className="cart-header flex justify-between items-center">
              <Header title="Cart" />
              <Button onClick={handleClear}>Clear Cart</Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow className="text-gray-600 uppercase">
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.id} className=" py-2 px-10">
                    <TableCell>
                      <div className="flex items-center">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-16 h-16 mr-4"
                        />
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          {/* <p>Size: {item.size}</p> */}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="flex items-center">
                      <Button
                        className=" !text-xl border border-[#4E1B61] h-10 w-10 rounded-r-none relative left-0.5"
                        onClick={() => handleDecreaseQuantity(item.id)}
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
                        onClick={() => handleIncreaseQuantity(item.id)}
                      >
                        <PlusIcon />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <p className=" font-semibold">
                        ₹ {item.price.toFixed(2)}
                      </p>
                    </TableCell>
                  </TableRow>
                ))}
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
          <p>Subtotal:</p>
          <p>₹ {subtotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>Discount:</p>
          <p>₹ 0</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>IGST:</p>
          <p>₹ 0</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>CGST:</p>
          <p>₹ 0</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>Total Including GST:</p>
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
