import React from "react";

const CategorySkeleton = () => {
  return (
    <section className="px-[5%] lg:py-16 md:py-12 sm:py-10 py-4">
      <div className="category max-w-[100rem] mx-auto">
        {/* Skeleton for Header */}
        <div className="h-8 w-1/4 mb-5 bg-gray-300 animate-pulse"></div>
        
        <div className="relative w-[92%] mx-auto">
          {/* Skeleton for CarouselPrevious */}
          <div className="absolute border-2 border-black text-black lg:top-20 md:top-16 top-12 sm:-left-14 -left-8 w-12 h-12 bg-gray-300 animate-pulse"></div>
          
          <div className="p-3 flex overflow-hidden">
            {Array(6).fill(0).map((_, index) => (
              <div
                key={index}
                className="md:basis-1/2 lg:basis-1/3 hover:scale-105 ease-in-out transition-all duration-150 lg:max-w-40 md:max-w-32 max-w-24 md:mx-0.5 mx-0"
              >
                <div className="block">
                  <div className="cursor-pointer">
                    <div className="relative w-full h-full p-0 m-0 aspect-square bg-gray-300 animate-pulse rounded-xl">
                      <div className="absolute w-full h-full left-0 top-0 z-10 bg-[#ffffff30]"></div>
                    </div>
                    <div className="text-center mt-2 font-medium lg:text-base md:text-sm text-xs w-3/4 mx-auto h-6 bg-gray-300 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Skeleton for CarouselNext */}
          <div className="absolute border-black text-black lg:top-20 md:top-16 top-12 sm:-right-14 -right-8 w-12 h-12 bg-gray-300 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default CategorySkeleton;
