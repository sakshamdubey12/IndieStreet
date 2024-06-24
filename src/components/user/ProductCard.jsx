import { HeartIcon, PowerSquare } from "lucide-react";
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
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const ProductCard = (product) => {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const [wishlistIDs, setWishlistIDs] = useState([]);

  const handleAddToWishlist = (item) => {
    dispatch(addToWishlist(item));
  };

  const handleRemoveFromWishlist = (item) => {
    dispatch(removeFromWishlist(item));
  };

  const handleWishlist = (ProductId) => {
    if (wishlistIDs.includes(ProductId)) {
      handleRemoveFromWishlist(ProductId);
    } else {
      handleAddToWishlist(ProductId);
    }
  };

  useEffect(() => {
    const ids = wishlistItems.map((item) => item.id);
    setWishlistIDs(ids);
  }, [wishlistItems]);

  return (
    <Card className="hover:shadow-[0_0_10px_rgba(78,27,97,0.20)] transition-shadow duration-200 p-0 rounded overflow-hidden cursor-pointer border m-0 h-[23rem]">
      <CardHeader className="p-0 relative top-0 space-y-0">
        <div
          onClick={() => handleWishlist(product.product.id)}
          className="icons absolute top-3 right-3 flex flex-col justify-center items-center"
        >
          <button
            className={
              (wishlistIDs.includes(product.product.id)
                ? "bg-[#4E1B61] text-white "
                : "bg-white/90 text-[#4E1B61] ") +
              `py-2.5 px-2.5 rounded-full text-sm font-medium hover:bg-[#4E1B61] hover:text-white duration-150 ease-in-out transition-all mb-2`
            }
          >
            <HeartIcon className=" w-5 h-5" />
          </button>
        </div>
        <img
          src={product.product.images[0]}
          alt={product.product.name}
          className="w-full h-52 object-cover rounded-lg"
        />
        <button className=" absolute bottom-0 py-2 text-sm bg-white/90 font-medium hover:bg-[#4E1B61] hover:text-white duration-150 ease-in-out transition-all w-full">
          View Product
        </button>
      </CardHeader>
      <CardContent className=" p-2">
        <CardTitle className=" text-sm mb-0.5 line-clamp-2 font-normal">
          <span className="block uppercase font-semibold text-xs mb-1 text-gray-500">
            {product.product.businessName}
          </span>
          <Link
            className="card-cont block"
            href={`/product/${product.product.name
              .toLowerCase()
              .replace(" ", "-")}/${product.product.id}`}
          >
            <span className="block">{product.product.name}</span>
          </Link>
        </CardTitle>
        <CardDescription className=" flex flex-col items-baseline">
          <span className=" mb-1">
            <span className="text-base font-medium text-red-600 mr-1.5">
              &#x20b9;{" "}
              {product.product.price -
                (product.product.offer / 100) * product.product.price}
            </span>
            <span className=" line-through text-sm mr-3">
              {product.product.price}
            </span>
            <span className="">-{product.product.offer}%</span>{" "}
          </span>

          <span className="flex items-center w-full text-sm mb-2">
            <span className="flex mr-1.5">
              <FaStar className=" mr-1 mt-0.5 text-yellow-500" />
              <span className=" font-semibold">{product.product.rating}</span>
            </span>
            <span className=" block w-1.5 h-1.5 bg-gray-600 rounded-full mr-1.5"></span>
            <span className=" font-medium underline">
              {product.product.rating} Reviews
            </span>
          </span>
        </CardDescription>
        <CardFooter className=" flex">
          <Button
            onClick={() => {
              handleAddToCart(product.product);
            }}
            variant="ghost"
            className="w-1/2 !text-sm bg-gray-200/60 hover:bg-gray-200/60 hover:border-0 border-0 hover:text-gray-800 text-gray-800 mr-2 py-2.5 rounded"
          >
            Add to Cart
          </Button>
          <Button className="w-1/2 !text-sm py-2.5 rounded">Buy Now</Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
