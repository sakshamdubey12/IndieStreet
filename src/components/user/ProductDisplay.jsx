import Link from "next/link";
import Header from "./Header";
import {
  Card,
  CardContent,
} from "@/components/ui/card";


const ProductDisplay = ({ title, url }) => {
  const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6"];

  return (
    <section className=" px-[5%] lg:py-16 md:py-12 sm:py-10 py-6 mx-auto max-w-[100rem]">
      <div className="header flex items-center justify-between sm:mb-8 mb-4">
        <Header title={title} className="mt-4" />
        <Link
          href={url}
          className="border border-[#4E1B61] text-[#4E1B61] hover:bg-[#4E1B61] hover:text-[#CDF520] transition-all ease-in-out duration-200 font-medium lg:px-5 lg:py-2 px-3.5 py-1.5 md:text-base sm:text-sm text-xs rounded"
        >
          View More
        </Link>
      </div>
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2">
        {items.map((item, index) => (
          <div
            key={index}
            className=" w-full lg:h-60 flex-shrink-0 flex justify-center items-center"
          >
            <Card className="h-full w-full">
              <CardContent className="flex aspect-square items-center justify-center w-full h-full">
                <div
                  className="bg-gray-200 rounded-lg p-4 w-full h-full md:text-base sm:text-sm text-xs"
                  style={{ borderRadius: "10px" }}
                >
                  {item}
                </div>
              </CardContent>
            </Card>
            {/* <div
              className="bg-gray-200 rounded-lg p-4 w-full h-full"
              style={{ borderRadius: "10px" }}
            >
              {item}
            </div> */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductDisplay;
