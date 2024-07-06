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
import { useGetProductsByIDQuery } from "@/redux/slices/user/GetSingleProduct";
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
import { usePostReviewMutation } from "@/redux/slices/user/ProductReview";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/redux/slices/user/wishlistSlice";
import { addToCart, removeFromCart } from "@/redux/slices/user/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { IoHeartDislikeSharp } from "react-icons/io5";
import ProductPage from "@/components/user/skeleton/ProductPage";

const ProductInfo = ({ params }) => {
  const id =  params.productid
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const cart = useSelector((state) => state.cart);
  const [isInCart, setIsInCart] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: "", review: "" ,productId:""});
  const [postReview, { isLoading: reviewLoading, isSuccess, isError }] =
  usePostReviewMutation();
  const { data, error, isLoading, refetch } = useGetProductsByIDQuery(id);
  console.log(data?.response.allReviews);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prevData) => ({ ...prevData, [name]: value }));
  };
  reviewData.productId= params.productid;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const ratingValue = Number(reviewData.rating);
    if (isNaN(ratingValue) || ratingValue < 0 || ratingValue > 5) {
      alert("wrong format of review");
      return;
    }
    try {
      await postReview({productId:id, reviewData }).unwrap();
      console.log("Review posted successfully!");
      setReviewData({ rating: "", review: "" });
    } catch (error) {
      console.error("Failed to post review:", error);
    }
  };

  useEffect(() => {
    const isInWishlist = wishlist.some((item) => item.id === id);
    setIsInWishlist(isInWishlist);
    const isInCart = cart.some((item) => item.id === id);
    setIsInCart(isInCart);
  }, [wishlist, cart, id]);
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
                    "lg:min-w-full max-w-[500px] lg:h-[30rem] md:h-[500px] sm:h-[400px] h-[350px] p-0 m-0 relative"
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
            <div className="price flex items-baseline md:mb-3 sm:mb-2 mb-1">
              <Header
                title={`₹${data?.response?.offerPrice}`}
                className=" font-medium text-red-600 mr-2"
              />
              <span className="lg:text-base text-sm line-through text-gray-600 mr-2">
                ₹ {data?.response?.price}
              </span>
            </div>
            <div className="cta w-full grid grid-cols-2 gap-2 mb-5">
              <Button
                onClick={handleCartClick}
                variant="ghost"
                className={
                  (isInCart
                    ? "bg-[#cef52044] hover:bg-[#cef52044] "
                    : "bg-gray-200/60 hover:bg-gray-200/60 ") +
                  "!text-sm hover:border-0 border-0 hover:text-gray-600 text-gray-600 md:py-4 py-3 rounded"
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
              <Button className="md:py-4 py-3">Buy Now</Button>
            </div>
            <span className=" block w-full h-[1px] bg-gray-600/20"></span>
            <div className="condition">
              <Table className="w-full">
                <TableBody>
                  <TableRow className="flex-wrap flex sm:flex-row flex-col">
                    <TableCell className="flex flex-col sm:w-1/2 w-full sm:py-5 py-3 px-2 sm:border-r border-r-0 sm:border-b-0 border-b">
                      <h1 className=" font-medium mb-2">Delivery Option</h1>
                      <div className="location flex items-end mb-2">
                        <form className=" flex mr-2">
                          <span className=" sm:p-3 p-2 sm:h-11 h-8 bg-[#4e1b61] text-white text-lg rounded-l z-0">
                            <FaLocationDot className=" sm:w-5 sm:h-5 w-4 h-4" />
                          </span>
                          <Input
                            placeholder="000000"
                            className=" -ml-0.5 sm:h-11 h-8 w-20"
                            minLength="6"
                            maxLength="6"
                          />
                        </form>
                      </div>
                      <p className="text-xs text-gray-600/90">
                        Please enter Pin code to check delivery time & Pay on
                        delivery availability
                      </p>
                    </TableCell>
                    <TableCell className="flex flex-col sm:w-1/2 w-full sm:py-5 py-3 px-2">
                      <h1 className=" font-medium mb-2">Shipping Details</h1>
                      <p className="text-xs text-gray-600/90">
                        Check Return Policy
                      </p>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      <div className="review-specs grid lg:grid-cols-4 grid-cols-1 lg:gap-10 gap-5 relative">
        <div className="review col-span-2 lg:sticky top-28 h-fit">
          <div className="post-review md:mb-5 sm:mb-3 mb-1 flex items-end justify-between">
            <Header
              title="Customer Reviews"
              className="block text-end mb-0 pb-0"
            />
            <Dialog>
              <DialogTrigger className="sm:text-sm text-xs border px-3 py-2 rounded bg-[#4e1b61] text-white">
                Add Review
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle className="mb-2">Add your Review</DialogTitle>
                  <div>
                    <form onSubmit={handleSubmit}>
                      <Label>Rating</Label>
                      <Input
                        name="rating"
                        placeholder="Ratings"
                        value={reviewData.rating}
                        onChange={handleChange}
                        className="mb-1"
                        required
                      />
                      <Label>Review</Label>
                      <Textarea
                        name="review"
                        placeholder="Add your Review here...."
                        value={reviewData.review}
                        onChange={handleChange}
                        required
                        className="mb-2"
                      />
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Submitting..." : "Add Review"}
                      </Button>
                    </form>
                    {isSuccess && <p>Review posted successfully!</p>}
                    {isError && <p>Failed to post review. Please try again.</p>}
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <div>
            {isLoading?<>loading...</>:data.response.allReviews && data.response.allReviews.map((review, index) => (
              <div className="review-card shadow-none" key={index}>
                <Card className="w-full py-3 px-5">
                  <div className="info flex items-center justify-between md:mb-3 sm:mb-2">
                    <div className="user flex items-center">
                      <Avatar className="mr-2.5">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <h1 className="font-medium">{review.fullName}</h1>
                    </div>
                    <div className="rating flex text-gray-600/95 items-center">
                      <FaStar className=" mr-1.5 text-yellow-500" />
                      <span className=" font-semibold mt-0.5">
                        {review.rating}
                      </span>{" "}
                    </div>
                  </div>
                  {/* <div
                    className={
                      (review.images.length > 0 ? "flex mb-2 " : "hidden ") +
                      "images text-gray-600"
                    }
                  >
                    {review?.images.map((image, index) => (
                      <div
                        className="img-cont md:w-20 sm:w-16 w-14 md:h-20 sm:h-16 h-14 overflow-hidden rounded mx-1"
                        key={index}
                      >
                        <Image
                          width={1000}
                          height={1000}
                          src={image}
                          alt=""
                          className="object-fill md:w-20 sm:w-16 w-14 md:h-20 sm:h-16 h-14"
                        />
                      </div>
                    ))}
                  </div> */}
                  <CardDescription className="text-gray-600">
                    {review.review}
                  </CardDescription>
                </Card>
              </div>
 
 ))}
          </div>
          {/* <div className="review-card shadow-none">
            <Card className="w-full py-3 px-5">
              <div className="info flex items-center justify-between md:mb-3 sm:mb-2 mb-1">
                <div className="user flex items-center">
                  <Avatar className="mr-2.5 md:h-10 md:w-10 sm:w-9 sm:h-9 h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <h1 className=" md:text-lg sm:text-base text-sm font-medium">
                    John Doe
                  </h1>
                </div>
                <div className="rating flex text-gray-600/95 items-center">
                  <FaStar className=" mr-1.5 text-yellow-500" />
                  <span className=" font-semibold mt-0.5 sm:text-sm text-xs">
                    4.5
                  </span>{" "}
                </div>
              </div>
              <div className="images flex sm:mb-2 mb-1 text-gray-600"></div>
              <CardDescription className=" text-gray-600 sm:text-sm text-xs">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo dignissimos tenetur ea sed delectus autem quibusdam!
                Qui omnis commodi voluptatum laudantium consequatur fugiat earum
                est, sint quisquam error eaque illum.
              </CardDescription>
            </Card>
          </div> */}
        </div>
        <div className="Specifications col-span-2 lg:sticky top-28 h-fit">
          <Header title="Product Details" />
          <div className="spec-cont w-full">
            <Table className="w-full text-gray-600 sm:text-sm text-xs">
              <TableBody>
                {data?.response?.specs[0]?.split(",").map((spec, index) => {
                  const [key, value] = spec.split(":");
                  return (
                    <TableRow key={index}>
                      <TableCell className="w-44 flex items-start">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </TableCell>
                      <TableCell className="w-full">{value}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductInfo;
