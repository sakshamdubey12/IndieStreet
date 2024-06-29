import { HeartIcon, Trash2, TrashIcon } from "lucide-react";
import { IoHeartDislikeSharp } from "react-icons/io5";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { Button } from "../ui/button";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/redux/slices/wishlistSlice";
import { addToCart, removeFromCart } from "@/redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const cart = useSelector((state) => state.cart);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const isInWishlist = wishlist.some((item) => item.id === product.id);
    setIsInWishlist(isInWishlist);
    const isInCart = cart.some((item) => item.id === product.id);
    setIsInCart(isInCart);
  }, [wishlist, product.id, cart]);

  const handleWishlistClick = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product));
    } else {
      dispatch(addToWishlist(product));
    }
    setIsInWishlist(!isInWishlist);
  };

  const handleCartClick = () => {
    if (isInCart) {
      dispatch(removeFromCart(product));
    } else {
      dispatch(addToCart(product));
    }
    setIsInCart(!isInCart);
  };

  return (
    <Card className="hover:shadow-[0_0_10px_rgba(78,27,97,0.20)] transition-shadow duration-200 p-0 rounded overflow-hidden cursor-pointer border m-0 h-[23rem]">
      <CardHeader className="p-0 relative top-0 space-y-0">
        <div className="icons absolute top-3 right-3 flex flex-col justify-center items-center">
          <button
            onClick={handleWishlistClick}
            className={
              (isInWishlist ? "bg-[#4E1B61] text-white" : "bg-white/90 text-[#4E1B61]") +
              "  w-10 h-10 rounded-full text-sm font-medium grid place-items-center relative"
            }
          >
            {isInWishlist ? (
              <IoHeartDislikeSharp className="w-5 h-5 absolute" />
            ) : (
              <HeartIcon fill="#4E1B61" className="w-5 h-5 absolute" />
            )}
          </button>
        </div>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-52 object-cover rounded-lg"
        />
        <button className="absolute bottom-0 py-2 text-sm bg-white/90 font-medium hover:bg-[#4E1B61] hover:text-white duration-150 ease-in-out transition-all w-full">
          View Product
        </button>
      </CardHeader>
      <CardContent className="p-2">
        <CardTitle className="text-sm mb-0.5 line-clamp-2 font-normal">
          <span className="block uppercase font-semibold text-xs mb-1 text-gray-500">
            {product.businessName}
          </span>
          <Link
            className="card-cont block"
            href={`/product/${product.name.toLowerCase().replace(" ", "-")}/${
              product.id
            }`}
          >
            <span className="block">{product.name}</span>
          </Link>
        </CardTitle>
        <CardDescription className="flex flex-col items-baseline">
          <span className="mb-1">
            <span className="text-base font-medium text-red-600 mr-1.5">
              &#x20b9; {product.price - (product.offer / 100) * product.price}
            </span>
            <span className="line-through text-sm mr-3">{product.price}</span>
            <span className="">-{product.offer}%</span>
          </span>
          <span className="flex items-center w-full text-sm mb-2">
            <span className="flex mr-1.5">
              <FaStar className="mr-1 mt-0.5 text-yellow-500" />
              <span className="font-semibold">{product.rating}</span>
            </span>
            <span className="block w-1.5 h-1.5 bg-gray-600 rounded-full mr-1.5"></span>
            <span className="font-medium underline">
              {product.rating} Reviews
            </span>
          </span>
        </CardDescription>
        <CardFooter className="flex">
          <Button
            onClick={handleCartClick}
            variant="ghost"
            className={
              (isInCart
                ? "bg-[#cef52044] hover:bg-[#cef52044] "
                : "bg-gray-200/60 hover:bg-gray-200/60 ") +
              "w-1/2 !text-sm hover:border-0 border-0 hover:text-gray-600 text-gray-600 mr-2 py-2.5 rounded"
            }
          >
            {isInCart ? (
              <>
                <Trash2 className="w-4 h-4 mr-1 relative bottom-0.5" />{" "}
                <span>Remove</span>
              </>
            ) : (
              "Add to Cart"
            )}
          </Button>
          <Button className="w-1/2 !text-sm py-2.5 rounded">Buy Now</Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
