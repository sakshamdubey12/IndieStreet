import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const UserFooter = () => {
  return (
    <footer className="bg-[#4E1B61] text-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-24 gap-6 px-4 md:py-10 py-8">
        <div>
          <h2 className="md:text-xl text-lg font-semibold sm:mb-2.5 mb-1.5">
            Indiestreet
          </h2>
          <p className="sm:text-sm text-xs text-[#ddd]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, facilis
            eum inventore ea nisi mollitia corrupti provident recusandae quiddd
            perspiciatis doloribus distinctio aut.
          </p>
        </div>
        <div>
          <h2 className="md:text-xl text-lg font-semibold sm:mb-2.5 mb-1.5">
            Categories
          </h2>
          <ul className="md:text-sm text-xs text-[#ddd]">
            <li className=" md:mb-2.5 mb-1.5">
              <Link
                href="/"
                className="hover:text-[#CDF520] duration-150 ease-in-out transition-all"
              >
                Category 1
              </Link>
            </li>
            <li className=" md:mb-2.5 mb-1.5">
              <Link
                href="/"
                className="hover:text-[#CDF520] duration-150 ease-in-out transition-all"
              >
                Category 2
              </Link>
            </li>
            <li className=" md:mb-2.5 mb-1.5">
              <Link
                href="/"
                className="hover:text-[#CDF520] duration-150 ease-in-out transition-all"
              >
                Category 3
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="md:text-xl text-lg font-semibold sm:mb-2.5 mb-1.5">
            Privacy and Policy
          </h2>
          <ul className="md:text-sm text-xs text-[#ddd]">
            <li className=" md:mb-2.5 mb-1.5">
              <Link
                href="/"
                className="hover:text-[#CDF520] duration-150 ease-in-out transition-all"
              >
                Help
              </Link>
            </li>
            <li className=" md:mb-2.5 mb-1.5">
              <Link
                href="/"
                className="hover:text-[#CDF520] duration-150 ease-in-out transition-all"
              >
                Terms and Conditions
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="md:text-xl text-lg font-semibold sm:mb-2.5 mb-1.5">
            Follow Us On
          </h2>
          <div className="flex space-x-4 md:text-2xl text-lg text-[#ddd]">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              className=" hover:text-[#CDF520] transition-all ease-in-out duration-150"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              className=" hover:text-[#CDF520] transition-all ease-in-out duration-150"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              className=" hover:text-[#CDF520] transition-all ease-in-out duration-150"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center md:mt-8 mt-4 bg-white text-black py-5">
        <p className="md:text-sm text-xs">
          &copy; {new Date().getFullYear()} Indiestreet. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default UserFooter;
