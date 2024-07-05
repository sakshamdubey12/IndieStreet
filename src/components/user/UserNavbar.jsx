"use client";
import Link from "next/link";
import { HeartIcon, ShoppingCartIcon, User2Icon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/redux/slices/common/authSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useGetProductsByCategoryQuery } from "@/redux/slices/user/GetAllProduct";
import { useGetProductCategoryQuery } from "@/redux/slices/admin/ProductCategorySlice";
import Image from "next/image";
import { useSelector } from "react-redux";

const UserNavbar = () => {
  const [lastScroll, setLastScroll] = useState(0);
  const [toggle, setToggle] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [email, setEmail] = useState(null);
  const [visibleCategories, setVisibleCategories] = useState([]);
  const [hiddenCategories, setHiddenCategories] = useState([]);
  const containerRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showCommandList, setShowCommandList] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();
  const { data } = useGetProductCategoryQuery();
  const cartLength = useSelector((state) => state.cart.length);
  const wishlistLength = useSelector((state) => state.wishlist.length);
  const { data: products } = useGetProductsByCategoryQuery();

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuth") === "true";
    setIsAuth(authStatus);

    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData && storedUserData.email) {
      setEmail(storedUserData.email);
    }

    const handleScroll = () => {
      const scrollHeight = window.scrollY;
      // console.log(scrollHeight);
      // console.log(scrollHeight > 102);
      setLastScroll(scrollHeight > 102);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    const categories = data?.data || [];
    let hidden = [];
    let visible = [...categories];

    if (windowWidth < 1300) {
      const interval = Math.floor((1300 - windowWidth) / 50);
      hidden = visible.splice(-interval);
    }

    setHiddenCategories(hidden);
    setVisibleCategories(visible);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth, data]);

  const handleLogout = () => {
    logout();
    setIsAuth(false);
    router.push("/");
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value.toLowerCase());
  };

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchInput)
  );

  return (
    <header className="shadow-[0_0_5px_rgba(78,27,97,0.50)] sticky top-0 z-50">
      <nav>
        <div className="offer bg-[#4E1B61] py-2 text-center text-white text-xs flex items-center justify-between">
          <marquee behavior="scroll" direction="left">
            <span className=" mr-10">
              Extra discount of 10% to our new customers
            </span>{" "}
          </marquee>
        </div>
        <div
          className={
            (lastScroll
              ? "bg-[#ffffff8b] backdrop-blur md:py-1 py-1"
              : "bg-white md:py-2 py-1") +
            ` !px-[5%] lower text-[#4E1B61] transition-all ease-in-out duration-200`
          }
        >
          <div className="grid lg:grid-cols-7 md:grid-cols-4 grid-cols-6 !max-w-[100rem] !mx-auto lg:gap-3 md:gap-1 gap-0">
            <div className="logo font-semibold transition-all ease-in-out duration-200 sm:col-span-1 col-span-2 order-1 w-full h-full flex items-center justify-center">
              <Link href="/" className="">
                <Image
                  src="/assets/website_logo.png"
                  width={1000}
                  height={1000}
                  style={{ objectFit: "cover" }}
                  className="xl:px-5 h-full w-full max-w-52 max-h-16"
                  alt=""
                />
              </Link>
            </div>
            <div className="ulcont lg:col-span-3 md:col-span-1 sm:col-span-3 col-span-3 h-full w-full order-2">
              <ul
                ref={containerRef}
                className="sm:flex hidden items-center font-medium text-sm ml-4 h-full lg:left-0 mx-auto"
              >
                {visibleCategories.map((category) => (
                  <li
                    key={category._id}
                    className={
                      (lastScroll ? "after:-bottom-1" : "after:-bottom-2") +
                      " h-16 w-max relative after:absolute after:rounded-t-xl after:w-0 after:h-1 after:bg-[#4E1B61] after:left-0 hover:after:w-full after:ease-in-out after:duration-300 after:transition-all"
                    }
                  >
                    <Link
                      href={`/category/${category.categoryName
                        .toLowerCase()
                        .replace(" ", "-")}/${category._id}`}
                      className="px-2 h-full flex justify-center items-center text-center"
                    >
                      {category.categoryName}
                    </Link>
                  </li>
                ))}
                {hiddenCategories.length > 0 && (
                  <li className="md:h-16">
                    <NavigationMenu>
                      <NavigationMenuList>
                        <NavigationMenuItem>
                          <NavigationMenuTrigger
                            className={
                              (lastScroll
                                ? "after:-bottom-1"
                                : "after:-bottom-2") +
                              " h-16 w-max relative after:absolute after:rounded-t-xl !after:w-0 after:h-1 after:bg-[#4E1B61] after:left-0 hover:after:w-full after:ease-in-out after:duration-300 after:transition-all"
                            }
                          >
                            Categories
                          </NavigationMenuTrigger>
                          <NavigationMenuContent className="bg-white grid grid-cols-1 py-2 !border border-[#4e1b6156]">
                            <div className="links col-span-1">
                              {hiddenCategories.map((category) => (
                                <NavigationMenuLink
                                  key={category._id}
                                  href={`/category/${category.categoryName
                                    .toLowerCase()
                                    .replace(" ", "-")}/${category._id}`}
                                  className="block px-2 py-0.5 relative after:absolute after:w-1 after:rounded-l after:h-full after:right-0 after:top-0 after:bg-[#4E1B61] after:opacity-0 hover:after:opacity-100 after:ease-in-out after:duration-300 after:transition-all font-medium hover:font-semibold duration-75 ease-in-out transition-all md:text-base text-sm"
                                >
                                  {category.categoryName}
                                </NavigationMenuLink>
                              ))}
                            </div>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      </NavigationMenuList>
                    </NavigationMenu>
                  </li>
                )}
              </ul>
            </div>
            <div
              className={
                "search h-full lg:col-span-2 md:col-span-1 col-span-7 md:order-3 order-4 w-full flex justify-center items-center relative"
              }
            >
              <Command>
                <div className="relative w-full md:top-3 sm:mt-0 mt-1 xl:w-full lg:w-[80%]">
                  <CommandInput
                    placeholder="Search..."
                    className="xl:w-full"
                    onFocus={() => setShowCommandList(true)}
                    onBlur={() =>
                      setTimeout(() => setShowCommandList(false), 100)
                    }
                    onChange={handleSearchChange}
                  />
                  {showCommandList && (
                    <CommandList className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto z-50 commandlist">
                      <CommandEmpty>No results found.</CommandEmpty>
                      {filteredProducts?.map((product) => (
                        <CommandItem key={product.id} className="px-0 py-0">
                          <Link
                            className="block h-full w-full px-3 py-1.5"
                            href={`/product/${product.name
                              .toLowerCase()
                              .replace(" ", "-")}/${product.id}`}
                            onMouseDown={(e) => {
                              e.preventDefault();
                            }}
                            onClick={() => {
                              setShowCommandList(false);
                              router.push(
                                `/product/${product.name
                                  .toLowerCase()
                                  .replace(" ", "-")}/${product.id}`
                              );
                            }}
                          >
                            {product.name}
                          </Link>
                        </CommandItem>
                      ))}
                    </CommandList>
                  )}
                </div>
              </Command>
            </div>
            <ul
              className={`flex items-center justify-end md:col-span-1 sm:col-span-2 col-span-1 md:order-4 order-3`}
            >
              <li
                className={
                  (lastScroll ? " " : "") +
                  "lg:ml-3 flex justify-center items-center rounded-full border-[#4E1B61] duration-150 ease-in-out transition-all"
                }
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="sm:h-10 sm:w-10 h-8 w-8 grid place-items-center">
                      <Link
                        href="/wishlist"
                        className=" sm:p-2.5 p-1 flex relative"
                      >
                        <HeartIcon
                          fill="#4E1B61"
                          className="sm:w-5 w-4 sm:h-5 h-4"
                        />
                        {wishlistLength > 0 ? (
                          <span
                            className={
                              (lastScroll
                                ? "bg-[#4E1B61] border-[#4E1B61] text-[#fff]"
                                : "bg-white") +
                              " absolute text-xs sm:top-0 -top-2 sm:right-0 -right-1.5 font-medium border rounded-full text-center w-5 h-5 flex justify-center items-center"
                            }
                          >
                            {wishlistLength}
                          </span>
                        ) : (
                          <></>
                        )}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className=" bg-white">
                      <p className="text-xs">Wishlist</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
              <li
                className={
                  (lastScroll ? " " : "") +
                  "ml-0.5 flex justify-center items-center rounded-full border-[#4E1B61] duration-150 ease-in-out transition-all"
                }
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="sm:h-10 sm:w-10 h-8 w-8 grid place-items-center">
                      <Link
                        href="/cart"
                        className=" sm:p-2.5 p-1 flex relative"
                      >
                        <ShoppingCartIcon
                          fill="#4E1B61"
                          className="sm:w-5 w-4 sm:h-5 h-4"
                        />
                        {cartLength > 0 ? (
                          <span
                            className={
                              (lastScroll
                                ? "bg-[#4E1B61] border-[#4E1B61] text-[#fff]"
                                : "bg-white") +
                              " absolute text-xs sm:top-0 -top-2 sm:right-0 -right-1.5 font-medium border rounded-full text-center w-5 h-5 flex justify-center items-center"
                            }
                          >
                            {cartLength}
                          </span>
                        ) : (
                          <></>
                        )}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className=" bg-white">
                      <p className=" text-xs">Cart</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
              <li className={"flex justify-center items-center lg:ml-3 ml-1.5"}>
                {isAuth ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className={
                        (lastScroll ? " " : "") +
                        "ml-0.5 flex justify-center items-center rounded-full border-[#4E1B61] duration-150 ease-in-out transition-all outline-none"
                      }
                    >
                      <User2Icon
                        fill="#4E1B61"
                        className=" sm:w-5 sm:h-5 w-3.5 h-3.5"
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className=" bg-white sm:text-sm text-xs w-44">
                      <DropdownMenuLabel>{email}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    href="/auth"
                    className={
                      (lastScroll
                        ? "bg-[#4E1B61] text-white "
                        : "bg-transparent ") +
                      "lg:ml-2 text-[#4E1B61] px-5 py-2 my-auto rounded sm:text-sm text-xs ease-in-out transition-all duration-150 border border-[#4E1B61] font-medium"
                    }
                  >
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default UserNavbar;
