// components/Cart.js
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CartItem = ({ item }) => (
  <div className="flex justify-between items-center py-2">
    <div className="flex items-center">
      <img src={item.image} alt={item.title} className="w-16 h-16 mr-4" />
      <div>
        <p className="font-bold">{item.title}</p>
        <p>Size: {item.size}</p>
      </div>
    </div>
    <div className="flex items-center">
      <Button variant="outline" size="sm" className="mx-2">-</Button>
      <Input width="50px" textAlign="center" value={item.quantity} readOnly className="text-center w-12" />
      <Button variant="outline" size="sm" className="mx-2">+</Button>
    </div>
    <p>₹ {item.price.toFixed(2)}</p>
    <Button variant="link" colorScheme="red" size="sm">Remove Item</Button>
  </div>
);

const Cart = () => {
  const cartItems = [
    { id: 1, title: 'Denim Jacket', size: 'M', quantity: 1, price: 2000.50, image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg' },
    { id: 2, title: 'Denim Jacket', size: 'M', quantity: 1, price: 2000.50, image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg' },
    { id: 3, title: 'Denim Jacket', size: 'M', quantity: 1, price: 2000.50, image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg' },
    { id: 4, title: 'Denim Jacket', size: 'M', quantity: 1, price: 2000.50, image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg' },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl mb-4">Cart</h2>
      {cartItems.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
      <div className="mt-4 p-4 border border-gray-200">
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
        <Button className="mt-4 w-full" size="lg" colorScheme="purple">Proceed to Checkout</Button>
      </div>
    </div>
  );
};

export default Cart;
