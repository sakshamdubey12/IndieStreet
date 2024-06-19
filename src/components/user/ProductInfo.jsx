"use client";
import React, { useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import Header from "./Header";

const images = [
  "https://images.pexels.com/photos/23541799/pexels-photo-23541799/free-photo-of-shine-bright.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
  "https://images.pexels.com/photos/17849671/pexels-photo-17849671/free-photo-of-handmade-watch-on-book-page.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/18338026/pexels-photo-18338026/free-photo-of-big-ben-in-london.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/23512402/pexels-photo-23512402/free-photo-of-three-candles-on-a-table-with-books.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/19602378/pexels-photo-19602378/free-photo-of-hands-holding-pizzas.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];


const ProductInfo = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fade, setFade] = useState(false);

  const handleNext = () => {
    setFade(true);
    setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
      setFade(false);
    }, 300);
  };

  const handlePrevious = () => {
    setFade(true);
    setTimeout(() => {
      setActiveIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length
      );
      setFade(false);
    }, 300);
  };

  const handleImageClick = (index) => {
    setFade(true);
    setTimeout(() => {
      setActiveIndex(index);
      setFade(false);
    }, 300);
  };

  return (
    <section className="px-[5%] py-16">
      <div className="product-info grid grid-cols-5 gap-10">
        <div className="img col-span-3 flex justify-between items-center">
          <div className="selection-carousel w-28 h-[44rem]">
            <div className="flex flex-col items-center h-full justify-between">
              <button
                onClick={handlePrevious}
                className="p-3 border border-[#4e1b618a] text-[#4e1b61] rounded-full"
              >
                <ArrowUp />
              </button>
              <div className="img-cont">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`w-28 h-28 p-1 rounded-xl border-2 transition duration-300 ${
                      index === activeIndex
                        ? "border-[#4e1b618a]"
                        : "border-transparent"
                    }`}
                    onClick={() => handleImageClick(index)}
                  >
                    <img
                      src={image}
                      alt={`Box ${index + 1}`}
                      className="w-full h-full object-cover rounded-xl cursor-pointer"
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={handleNext}
                className="p-3 border border-[#4e1b618a] text-gray-700 rounded-full"
              >
                <ArrowDown />
              </button>
            </div>
          </div>

          <div className="w-10/12">
            <img
              src={images[activeIndex]}
              alt="Active"
              className={`w-full h-[44rem] object-cover rounded-3xl transition-opacity duration-300 ease-in-out ${
                fade ? "opacity-0" : "opacity-100 shadow-[3px_3px_15px_rgba(78,27,97,0.50)]"
              }`}
            />
          </div>
        </div>
        <div className="info col-span-2">
          {/* <Header/> */}
        </div>
      </div>
    </section>
  );
};

export default ProductInfo;
