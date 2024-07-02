import React from 'react';

const ProductPage = () => {
  return (
    <section className="px-[7%] py-14 mx-auto max-w-[100rem]">
      <div className="product-info grid xl:grid-cols-4 lg:grid-cols-5 grid-cols-1 lg:gap-10 gap-5 mb-16 relative">
        <div className="img xl:col-span-2 lg:col-span-3 col-span-1 flex justify-between items-center lg:sticky top-32 h-fit">
          <div className="w-full bg-gray-200 animate-pulse h-96 rounded-lg"></div>
        </div>
        <div className="description lg:col-span-2 col-span-1 flex flex-col justify-between">
          <div className="upper">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-gray-200 h-8 w-3/4 rounded animate-pulse"></div>
              <div className="bg-gray-200 h-10 w-10 rounded-full animate-pulse"></div>
            </div>
            <div className="combine flex items-center mb-1">
              <div className="rating flex items-center">
                <div className="bg-gray-200 h-6 w-16 rounded animate-pulse"></div>
              </div>
              <span className="bg-gray-200 h-6 w-1 block mx-5 rounded-full"></span>
              <div className="review flex items-center">
                <div className="bg-gray-200 h-6 w-20 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="bg-gray-200 h-4 w-full rounded animate-pulse mb-3"></div>
            <div className="bg-gray-200 h-4 w-full rounded animate-pulse mb-3"></div>
            <div className="bg-gray-200 h-4 w-full rounded animate-pulse mb-3"></div>
          </div>
          <div className="price-cta">
            <div className="price flex items-baseline mb-3">
              <div className="bg-gray-200 h-8 w-20 rounded animate-pulse mr-2"></div>
              <div className="bg-gray-200 h-6 w-16 rounded animate-pulse"></div>
            </div>
            <div className="cta w-full flex mb-5">
              <div className="bg-gray-200 h-12 w-1/2 rounded animate-pulse mr-2"></div>
              <div className="bg-gray-200 h-12 w-1/2 rounded animate-pulse ml-2"></div>
            </div>
            <span className="block w-full h-[1px] bg-gray-200 animate-pulse mb-3"></span>
            <div className="condition">
              <div className="w-full flex flex-wrap">
                <div className="w-1/2 p-2 border-r border-gray-200">
                  <div className="bg-gray-200 h-6 w-32 rounded animate-pulse mb-2"></div>
                  <div className="bg-gray-200 h-10 w-full rounded animate-pulse"></div>
                </div>
                <div className="w-1/2 p-2">
                  <div className="bg-gray-200 h-6 w-32 rounded animate-pulse mb-2"></div>
                  <div className="bg-gray-200 h-10 w-full rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="review-specs grid lg:grid-cols-4 grid-cols-1 lg:gap-10 gap-5 relative">
        <div className="review col-span-2 lg:sticky top-28 h-fit">
          <div className="post-review mb-5 flex items-center justify-between">
            <div className="bg-gray-200 h-8 w-3/4 rounded animate-pulse"></div>
            <div className="bg-gray-200 h-10 w-24 rounded animate-pulse"></div>
          </div>
          <div>
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="review-card shadow-none mb-5">
                <div className="w-full py-3 px-5 bg-gray-200 animate-pulse rounded-lg h-24"></div>
              </div>
            ))}
          </div>
        </div>
        <div className="Specifications col-span-2 lg:sticky top-28 h-fit">
          <div className="bg-gray-200 h-8 w-3/4 rounded animate-pulse mb-5"></div>
          <div className="spec-cont w-full">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="w-full flex mb-3">
                <div className="bg-gray-200 h-6 w-1/4 rounded animate-pulse mr-2"></div>
                <div className="bg-gray-200 h-6 w-3/4 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
