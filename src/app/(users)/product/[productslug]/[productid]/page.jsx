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
  DialogDescription,
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

const ProductInfo = ({ params }) => {
  const dispatch = useDispatch();
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
    const isInWishlist = wishlist.some(
      (item) => item.id === data?.response?.id
    );
    setIsInWishlist(isInWishlist);
    const isInCart = cart.some((item) => item.id === data?.response?.id);
    setIsInCart(isInCart);
  }, [wishlist, cart]);

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

  return (
    <section className="px-[7%] py-14 mx-auto max-w-[100rem]">
      {isLoading ? (
        <>
          <div className="animate-pulse">
            <div className="product-info grid grid-cols-4 gap-10 mb-16 relative">
              <div className="img col-span-2 flex justify-between items-center sticky top-32 h-fit">
                <Carousel className="w-[80%] mx-auto">
                  <CarouselContent className="w-full">
                    {[1, 2, 3].map((_, index) => (
                      <CarouselItem
                        key={index}
                        className={
                          (index === 0 ? "" : " left-4 ") +
                          `min-w-full h-[30rem] p-0 m-0 relative`
                        }
                      >
                        <div className=" m-0 p-0 w-full h-[30rem] left-4 relative">
                          <Card className="m-0 p-0 w-full h-[30rem]">
                            <CardContent className="flex items-center justify-center h-[30rem] overflow-hidden">
                              <div className="w-full h-full bg-gray-300 rounded-xl" />
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="p-3 border border-gray-300 rounded-full -left-16" />
                  <CarouselNext className="p-3 border border-gray-300 rounded-full -right-16" />
                </Carousel>
              </div>
              <div className="description col-span-2 flex flex-col justify-between">
                <div className="upper">
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-8 bg-gray-300 w-1/2" />
                    <div className="p-3 rounded-full bg-gray-300 w-8 h-8" />
                  </div>
                  <div className="combine flex items-center mb-1">
                    <div className="rating flex text-gray-600/95 items-center">
                      <FaStar className=" mr-1.5 text-gray-300" />
                      <span className=" font-semibold mt-0.5 bg-gray-300 w-6 h-6" />
                    </div>
                    <span className=" bg-gray-300 w-0.5 h-7 block mx-5 rounded-full"></span>
                    <div className="review flex items-center text-gray-600/95">
                      <span className=" mr-1 font-semibold mt-0.5 bg-gray-300 w-16 h-6" />
                    </div>
                  </div>
                  <p className=" text-gray-300 mb-3 h-6 w-3/4"></p>
                </div>
                <div className="price-cta">
                  <div className="price flex items-baseline mb-3">
                    <span className="offer text-2xl font-medium bg-gray-300 w-16 h-8 mr-2"></span>
                    <span className=" text-lg line-through bg-gray-300 w-12 h-8 mr-2"></span>
                  </div>
                  <div className="cta w-full flex mb-5">
                    <Button className="bg-gray-300 border w-1/2 py-4 mr-2"></Button>
                    <Button className="bg-gray-300 w-1/2 py-4 ml-2"></Button>
                  </div>
                  <span className=" block w-full h-[1px] bg-gray-300"></span>
                  <div className="condition">
                    <Table className="w-full">
                      <TableBody>
                        <TableRow className="flex-wrap flex">
                          <TableCell className="flex flex-col w-1/2 py-5 px-2 border-r bg-gray-300 h-16"></TableCell>
                          <TableCell className="flex flex-col w-1/2 py-5 px-2 bg-gray-300 h-16"></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
            <div className="review-specs grid grid-cols-4 gap-10 relative">
              <div className="review col-span-2 sticky top-28 h-fit">
                <div className="post-review mb-5 flex items-center justify-between">
                  <Header title="" className="bg-gray-300 h-8 w-1/2" />
                  <Button className="py-2 bg-gray-300 w-1/4"></Button>
                </div>
                <div>
                  {[1, 2].map((_, index) => (
                    <div key={index} className="review-card shadow-none">
                      <Card className="w-full py-3 px-5">
                        <div className="info flex items-center justify-between mb-3">
                          <div className="user flex items-center">
                            <Avatar className="mr-2.5">
                              <div className="w-10 h-10 bg-gray-300 rounded-full" />
                            </Avatar>
                            <h1 className="font-medium bg-gray-300 w-20 h-6"></h1>
                          </div>
                          <div className="rating flex text-gray-600/95 items-center">
                            <FaStar className=" mr-1.5 text-gray-300" />
                            <span className=" font-semibold mt-0.5 bg-gray-300 w-6 h-6" />
                          </div>
                        </div>
                        <CardDescription className="text-gray-300 h-16 w-full" />
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
              <div className="Specifications col-span-2 sticky top-28 h-fit">
                <Header title="" className="bg-gray-300 h-8 w-1/2" />
                <div className="spec-cont w-full">
                  <Table className="w-full text-gray-600">
                    <TableBody>
                      {[1, 2, 3].map((_, index) => (
                        <TableRow key={index}>
                          <TableCell className="w-44 flex items-start bg-gray-300 h-8"></TableCell>
                          <TableCell className="bg-gray-300 h-8"></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="product-info grid lg:grid-cols-4 grid-cols-1 gap-10 mb-16 relative">
            <div className="img col-span-2 flex justify-between items-center lg:sticky top-32 h-fit">
              <Carousel className="w-[80%] mx-auto">
                <CarouselContent className="w-full">
                  {data?.response?.images.map((image, index) => (
                    <CarouselItem
                      key={index}
                      className={
                        (index === 0 ? "" : " left-4 ") +
                        `lg:min-w-full max-w-[500px] lg:h-[30rem] md:h-[500px] sm:h-[400px] h-[250px] p-0 m-0 relative`
                      }
                    >
                      <div className=" m-0 p-0 lg:min-w-full max-w-[500px] lg:h-[30rem] md:h-[500px] sm:h-[400px] h-[250px]  left-4 relative">
                        <Card className="m-0 p-0 lg:min-w-full max-w-[500px] lg:h-[30rem] md:h-[500px] sm:h-[400px] h-[250px]">
                          <CardContent className="flex items-center justify-center lg:h-[30rem] md:h-[500px] sm:h-[400px] h-[250px] overflow-hidden">
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
                <CarouselPrevious className="p-3 border border-[#4e1b618a] text-[#4e1b61] rounded-full lg:-left-16 -left-10" />
                <CarouselNext className="p-3 border border-[#4e1b618a] text-[#4e1b61] rounded-full lg:-right-16 -right-10" />
              </Carousel>
            </div>
            <div className="description col-span-2 flex flex-col justify-between">
              <div className="upper">
                <div className="flex items-center justify-between mb-3">
                  <Header title={data?.response?.name} className="text-3xl" />
                  <button
                    onClick={handleWishlistClick}
                    className={
                      (isInWishlist
                        ? "bg-gray-200/60 text-gray-600"
                        : "bg-gray-200/60 text-gray-600") +
                      "  w-10 h-10 rounded-full text-sm font-medium grid place-items-center relative"
                    }
                  >
                    {isInWishlist ? (
                      <IoHeartDislikeSharp className="w-5 h-5 absolute" />
                    ) : (
                      <HeartIcon fill="#4b5563" className="w-5 h-5 absolute" />
                    )}
                  </button>
                </div>
                <div className="combine flex items-center mb-1">
                  <div className="rating flex text-gray-600/95 items-center">
                    <FaStar className=" mr-1.5 text-yellow-500" />
                    <span className=" font-semibold mt-0.5">
                      {data?.response?.rating}
                    </span>{" "}
                  </div>
                  <span className=" bg-gray-600/70 w-0.5 h-7 block mx-5 rounded-full"></span>
                  <div className="review flex items-center text-gray-600/95">
                    <span className=" mr-1 font-semibold mt-0.5">
                      {data?.response?.reviews?.length > 0
                        ? data?.response?.reviews?.length
                        : 0}{" "}
                      Reviews
                    </span>
                  </div>
                </div>
                <p className=" text-gray-600 mb-3">
                  {data?.response?.description}
                </p>
              </div>
              <div className="price-cta">
                <div className="price flex items-baseline mb-3">
                  <span className="offer text-2xl font-medium text-red-600 mr-2">
                    ₹ {data?.response?.offerPrice}
                  </span>
                  <span className=" text-lg line-through text-gray-600 mr-2">
                    ₹ {data?.response?.price}
                  </span>
                </div>
                <div className="cta w-full flex mb-5">
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
                  <Button className="w-1/2 py-4 ml-2">Buy Now</Button>
                </div>
                <span className=" block w-full h-[1px] bg-gray-600/20"></span>
                <div className="condition">
                  <Table className="w-full">
                    <TableBody>
                      <TableRow className="flex-wrap flex">
                        <TableCell className="flex flex-col w-1/2 py-5 px-2 border-r">
                          <h1 className=" font-medium mb-2">Delivery Option</h1>
                          <div className="location flex items-end mb-2">
                            <form className=" flex mr-2">
                              <span className=" p-3 bg-[#4e1b61] text-white text-lg rounded-l z-0">
                                <FaLocationDot />
                              </span>
                              <Input
                                placeholder="000000"
                                className=" -ml-0.5 h-11 w-20"
                                minLength="6"
                                maxLength="6"
                              />
                            </form>
                          </div>
                          <p className="text-xs text-gray-600/90">
                            Please enter Pin code to check delivery time & Pay
                            on delivery availability
                          </p>
                        </TableCell>
                        <TableCell className="flex flex-col w-1/2 py-5 px-2">
                          <h1 className=" font-medium mb-2">
                            Shipping Details
                          </h1>
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
          <div className="review-specs grid lg:grid-cols-4 grid-cols-1 gap-10 relative">
            <div className="review col-span-2 sticky top-28 h-fit">
              <div className="post-review mb-5 flex items-center justify-between">
                <Header title="Customer Reviews" />
                {/* <Button></Button> */}
                <Dialog>
                  <DialogTrigger className=" text-sm border px-3 py-2 rounded bg-[#4e1b61] text-white">
                    Add Review
                  </DialogTrigger>
                  <DialogContent className="bg-white">
                    <DialogHeader>
                      <DialogTitle className="mb-2">
                        Add your Review
                      </DialogTitle>
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
                        {isError && (
                          <p>Failed to post review. Please try again.</p>
                        )}
                      </div>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
              <div>
                {data?.response?.reviews?.map((review) => (
                  <div className="review-card shadow-none">
                    <Card className="w-full py-3 px-5">
                      <div className="info flex items-center justify-between mb-3">
                        <div className="user flex items-center">
                          <Avatar className="mr-2.5">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <h1 className="font-medium">{review.postedBy}</h1>
                        </div>
                        <div className="rating flex text-gray-600/95 items-center">
                          <FaStar className=" mr-1.5 text-yellow-500" />
                          <span className=" font-semibold mt-0.5">
                            {review.rating}
                          </span>{" "}
                        </div>
                      </div>
                      <div className="images flex mb-2 text-gray-600">
                        {images.map((image, index) => (
                          <div
                            className="img-cont w-20 h-20 overflow-hidden rounded mx-1"
                            key={index}
                          >
                            <Image
                              width={1000}
                              height={1000}
                              src={image}
                              alt=""
                              className=" object-fill w-20 h-20"
                            />
                          </div>
                        ))}
                      </div>
                      <CardDescription className=" text-gray-600">
                        {review.review}
                      </CardDescription>
                    </Card>
                  </div>
                ))}
              </div>
              <div className="review-card shadow-none">
                <Card className="w-full py-3 px-5">
                  <div className="info flex items-center justify-between mb-3">
                    <div className="user flex items-center">
                      <Avatar className="mr-2.5">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <h1 className=" text-lg font-medium">John Doe</h1>
                    </div>
                    <div className="rating flex text-gray-600/95 items-center">
                      <FaStar className=" mr-1.5 text-yellow-500" />
                      <span className=" font-semibold mt-0.5">4.5</span>{" "}
                    </div>
                  </div>
                  <div className="images flex mb-2 text-gray-600"></div>
                  <CardDescription className=" text-gray-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Explicabo dignissimos tenetur ea sed delectus autem
                    quibusdam! Qui omnis commodi voluptatum laudantium
                    consequatur fugiat earum est, sint quisquam error eaque
                    illum.
                  </CardDescription>
                </Card>
              </div>
            </div>
            <div className="Specifications col-span-2 lg:sticky top-28 h-fit">
              <Header title="Product Details" />
              <div className="spec-cont w-full">
                <Table className="w-full text-gray-600">
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
        </>
      )}
    </section>
  );
};

export default ProductInfo;
