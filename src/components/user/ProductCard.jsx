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
} from "@/redux/slices/user/wishlistSlice";
import { addToCart, removeFromCart } from "@/redux/slices/user/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Image from "next/image";

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
    <Card className="hover:shadow-[0_0_10px_rgba(78,27,97,0.20)] transition-shadow duration-200 p-0 rounded overflow-hidden cursor-pointer border m-0 md:h-[21rem] h-[18rem]">
      <CardHeader className="p-0 relative top-0 space-y-0">
        <div className="icons absolute top-3 right-3 flex flex-col justify-center items-center">
          <button
            onClick={handleWishlistClick}
            className={
              (isInWishlist
                ? "bg-gray-200/60 text-gray-600"
                : "bg-gray-200/60 text-gray-600") +
              " md:w-10 md:h-10 w-8 h-8 rounded-full text-sm font-medium grid place-items-center relative"
            }
          >
            {isInWishlist ? (
              <IoHeartDislikeSharp className="md:w-5 w-4 md:h-5 h-4 absolute" />
            ) : (
              <HeartIcon fill="#4b5563" className="md:w-5 w-4 md:h-5 h-4 absolute" />
            )}
          </button>
        </div>
        <Image
          width={1000}
          height={1000}
          src={product.images[0]}
          alt={product.name}
          className="w-full md:h-44 sm:h-40 h-36 object-cover rounded-lg"
          // /w-full md:h-52 sm:h-44 h-36 object-cover rounded-lg
        />
        {/* <button className="absolute bottom-0 py-2 md:text-sm text-xs bg-white/90 font-medium hover:bg-[#4E1B61] hover:text-white duration-150 ease-in-out transition-all w-full">
          View Product
        </button> */}
      </CardHeader>
      <CardContent className="p-2">
        <CardTitle className="mb-0.5 line-clamp-2 font-normal">
          <span className="block uppercase font-semibold !text-xs md:mb-1 mb-0.5 text-gray-500">
            {product.businessName}
          </span>
          <Link
            className="card-cont block sm:text-base text-sm font-medium"
            href={`/product/${product.name.toLowerCase().replace(" ", "-")}/${
              product.id
            }`}
          >
            <span className="block">{product.name}</span>
          </Link>
        </CardTitle>
        <CardDescription className="flex flex-col items-baseline">
          <span className="mb-1">
            <span className="sm:text-base text-sm font-medium text-red-600 mr-1.5">
              &#x20b9; {product.price - (product.offer / 100) * product.price}
            </span>
            <span className="line-through sm:text-sm text-xs mr-3">{product.price}</span>
            <span className="sm:text-sm text-xs">-{product.offer}%</span>
          </span>
          <span className="flex items-center w-full sm:text-sm text-xs mb-2">
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
        <CardFooter className="grid grid-cols-2 sm:gap-2 gap-1">
          <Button
            onClick={handleCartClick}
            variant="ghost"
            className={
              (isInCart
                ? "bg-[#cef52044] hover:bg-[#cef52044] "
                : "bg-gray-200/60 hover:bg-gray-200/60 ") +
              "w-full sm:text-sm text-xs hover:border-0 border-0 hover:text-gray-600 text-gray-600 py-2.5 rounded"
            }
          >
            {isInCart ? (
              <>
                <span>Remove</span>
              </>
            ) : (
              "Add to Cart"
            )}
          </Button>
          <Button className="w-full sm:text-sm text-xs py-2.5 rounded">Buy Now</Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
