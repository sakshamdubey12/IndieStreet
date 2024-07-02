"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, HeartIcon, Trash2 } from "lucide-react";
import Header from "@/components/user/Header";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useGetProductsByIDQuery } from "@/redux/slices/GetSingleProduct";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePostReviewMutation } from "@/redux/slices/ProductReview";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/redux/slices/wishlistSlice";
import { addToCart, removeFromCart } from "@/redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { IoHeartDislikeSharp } from "react-icons/io5";
import Loading from "@/components/common/Loading";
import ProductPage from "@/components/user/skeleton/ProductPage";

const ProductInfo = ({ params }) => {
  const dispatch = useDispatch();
  const productId = params.productid;
  const wishlist = useSelector((state) => state.wishlist);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const cart = useSelector((state) => state.cart);
  const [isInCart, setIsInCart] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: "", review: "" });
  const [postReview, { isLoading: reviewLoading, isSuccess, isError }] =
    usePostReviewMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ratingValue = Number(reviewData.rating);
    if (isNaN(ratingValue) || ratingValue < 0 || ratingValue > 5) {
      alert("wrong format of review");
      return;
    }

    try {
      await postReview({ reviewData }).unwrap();
      console.log("Review posted successfully!");
      setReviewData({ rating: "", review: "" });
    } catch (error) {
      console.error("Failed to post review:", error);
    }
  };

  const { data, error, isLoading, refetch } = useGetProductsByIDQuery(
    params.productid
  );

  useEffect(() => {
    if (data?.response?.id) {
      const isInWishlist = wishlist.some(
        (item) => item.id === data?.response?.id
      );
      setIsInWishlist(isInWishlist);
      const isInCart = cart.some((item) => item.id === data?.response?.id);
      setIsInCart(isInCart);
    }
  }, [wishlist, cart, data?.response?.id]);

  console.log(cart, wishlist);
  console.log(data?.response);

  const handleWishlistClick = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(data?.response));
    } else {
      dispatch(addToWishlist(data?.response));
    }
    setIsInWishlist(!isInWishlist);
  };

  const handleCartClick = () => {
    if (isInCart) {
      dispatch(removeFromCart(data?.response));
    } else {
      dispatch(addToCart(data?.response));
    }
    setIsInCart(!isInCart);
  };

  if (isLoading) {
    return <ProductPage />;
  }

  return (
    <section className="px-[5%] md:py-16 sm:py-8 py-5 mx-auto max-w-[100rem]">
      <div className="product-info grid xl:grid-cols-4 lg:grid-cols-5 grid-cols-1 lg:gap-10 gap-5 md:mb-16 sm:mb-10 mb-6 relative">
        <div className="img xl:col-span-2 lg:col-span-3 col-span-1 flex justify-between items-center lg:sticky top-32 h-fit">
          <Carousel className="sm:w-[80%] w-[95%] mx-auto">
            <CarouselContent className="w-full">
              {data?.response?.images.map((image, index) => (
                <CarouselItem
                  key={index}
                  className={
                    (index === 0 ? "" : " left-4 ") +
                    `lg:min-w-full max-w-[500px] lg:h-[30rem] md:h-[500px] sm:h-[400px] h-[350px] p-0 m-0 relative`
                  }
                >
                  <div className=" m-0 p-0 lg:min-w-full max-w-[500px] lg:h-[30rem] md:h-[500px] sm:h-[400px] h-[350px] left-4 relative">
                    <Card className="m-0 p-0 lg:min-w-full max-w-[500px] lg:h-[30rem] md:h-[500px] sm:h-[400px] h-[350px]">
                      <CardContent className="flex items-center justify-center lg:h-[30rem] md:h-[500px] sm:h-[400px] h-[350px] overflow-hidden">
                        <Image
                          width={1000}
                          height={1000}
                          src={image}
                          alt=""
                          className=" w-full h-full object-cover rounded-xl"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border border-[#4e1b618a] text-[#4e1b61] rounded-full sm:-left-16 -left-8" />
            <CarouselNext className="border border-[#4e1b618a] text-[#4e1b61] rounded-full sm:-right-16 -right-8" />
          </Carousel>
        </div>
        <div className="description lg:col-span-2 col-span-1 flex flex-col justify-between lg:px-0 sm:px-3 px-1">
          <div className="upper">
            <div className="flex items-end justify-between md:mb-3 sm:mb-2 mb-1">
              <Header
                title={data?.response?.name}
                className="block text-end mb-1.5 pb-0"
              />
              <button
                onClick={handleWishlistClick}
                className={
                  (isInWishlist
                    ? "bg-gray-200/60 text-gray-600"
                    : "bg-gray-200/60 text-gray-600") +
                  " w-10 h-10 rounded-full text-sm font-medium grid place-items-center relative"
                }
              >
                {isInWishlist ? (
                  <IoHeartDislikeSharp className="md:w-5 w-4 md:h-5 h-4 absolute" />
                ) : (
                  <HeartIcon
                    fill="#4b5563"
                    className="md:w-5 w-4 md:h-5 h-4 absolute"
                  />
                )}
              </button>
            </div>
            <div className="combine flex items-center mb-1">
              <div className="rating flex text-gray-600/95 items-center">
                <FaStar className=" mr-1.5 text-yellow-500" />
                <span className=" font-medium mt-0.5 md:text-base text-sm">
                  {data?.response?.rating}
                </span>{" "}
              </div>
              <span className=" bg-gray-600/70 w-0.5 h-7 block mx-5 rounded-full"></span>
              <div className="review flex items-center text-gray-600/95">
                <span className=" mr-1 font-medium mt-0.5 md:text-base text-sm">
                  {data?.response?.reviews?.length > 0
                    ? data?.response?.reviews?.length
                    : 0}{" "}
                  Reviews
                </span>
              </div>
            </div>
            <p className=" text-gray-600 mb-3 md:text-base text-sm">
              {data?.response?.description}
            </p>
          </div>
          <div className="price-cta">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center text-gray-600">
                <FaLocationDot className="md:w-6 w-5 md:h-6 h-5 mr-1 text-gray-700" />
                <span className=" font-medium md:text-base text-sm mt-0.5">
                  {data?.response?.location}
                </span>
              </div>
              <div className="pricing md:text-lg sm:text-base text-sm text-gray-600/90">
                ₹ {data?.response?.price}
              </div>
            </div>
            <div className="cta grid sm:grid-cols-2 grid-cols-1 gap-3 sm:w-full w-4/5">
              <Button
                onClick={handleCartClick}
                className={
                  " sm:text-base text-sm sm:py-3 py-2 sm:px-8 px-6 " +
                  (isInCart
                    ? "bg-gray-400 hover:bg-gray-500 "
                    : "bg-primary-red hover:bg-red-600")
                }
              >
                {isInCart ? "Remove from Cart" : "Add to Cart"}
              </Button>
              <Button className="sm:text-base text-sm sm:py-3 py-2 sm:px-8 px-6 bg-primary-red hover:bg-red-600">
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="spec-review grid md:grid-cols-2 grid-cols-1 gap-10">
        <div className="specs grid sm:grid-cols-2 grid-cols-1 gap-4 mb-6">
          {data?.response?.specs.map((spec, index) => (
            <div
              key={index}
              className="spec-card flex justify-between items-center rounded-xl md:p-6 p-4 sm:bg-transparent bg-white border md:border-none border-gray-200"
            >
              <div className="spec-name font-medium text-gray-700/95 md:text-lg text-base">
                {spec.name}
              </div>
              <div className="spec-value font-medium text-gray-600/90 md:text-base text-sm">
                {spec.value}
              </div>
            </div>
          ))}
        </div>
        <div className="reviews flex flex-col">
          <h2 className="text-gray-800 font-semibold text-2xl mb-4">
            Customer Reviews
          </h2>
          {data?.response?.reviews.length > 0 ? (
            <div className="reviews-list flex flex-col gap-3">
              {data?.response?.reviews.map((review, index) => (
                <div
                  key={index}
                  className="review-item p-4 rounded-lg border border-gray-200"
                >
                  <div className="review-header flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={review.userAvatar} alt="" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div className="user-info flex flex-col">
                        <span className="font-medium text-gray-700">
                          {review.username}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {review.date}
                        </span>
                      </div>
                    </div>
                    <div className="rating flex items-center text-gray-600">
                      <FaStar className="text-yellow-500" />
                      <span className="font-medium text-sm ml-1">
                        {review.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600">{review.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No reviews yet.</p>
          )}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-6 bg-primary-red hover:bg-red-600">
                Write a Review
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Write a Review</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <Label htmlFor="rating">Rating</Label>
                  <Input
                    id="rating"
                    name="rating"
                    type="number"
                    value={reviewData.rating}
                    onChange={handleChange}
                    min="0"
                    max="5"
                    required
                  />
                </div>
                <div className="mb-4">
                  <Label htmlFor="review">Review</Label>
                  <Textarea
                    id="review"
                    name="review"
                    value={reviewData.review}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className={
                    "w-full " + (reviewLoading ? "bg-gray-400" : "bg-primary-red")
                  }
                  disabled={reviewLoading}
                >
                  {reviewLoading ? "Submitting..." : "Submit Review"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default ProductInfo;
