"use client";
import Link from "next/link";
import { Input } from "../ui/input";
import {
  HeartIcon,
  SearchIcon,
  ShoppingCartIcon,
  User2Icon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/redux/slices/authSlice";
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
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { useGetProductCategoryQuery } from "@/redux/slices/ProductCategorySlice";
import Image from "next/image";

const UserNavbar = () => {
  const [lastScroll, setLastScroll] = useState(0);
  const [toggle, setToggle] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [visibleCategories, setVisibleCategories] = useState([]);
  const [hiddenCategories, setHiddenCategories] = useState([]);
  const containerRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const router = useRouter();
  const { data, error, isLoading } = useGetProductCategoryQuery();

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuth") === "true";
    setIsAuth(authStatus);
    const handleScroll = () => {
      const scrollHeight = Math.floor(window.scrollY);
      setLastScroll(scrollHeight);
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
            (lastScroll > 104
              ? "bg-[#ffffff8b] backdrop-blur md:py-1 pb-1 pt-0.5"
              : "bg-white md:py-2 pb-2 pt-1") +
            ` !px-[5%] lower text-[#4E1B61] transition-all ease-in-out duration-200`
          }
        >
          <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-6 !max-w-[100rem] !mx-auto lg:gap-3 md:gap-2 gap-0">
            <div className="logo font-semibold transition-all ease-in-out duration-200 sm:col-span-1 col-span-2 order-1 w-full h-full flex items-center justify-center">
              <Link href="/" className="">
              <Image
                      src="/assets/website_logo.png"
                      width={1000}
                      height={1000}
                      style={{ objectFit: "cover" }}
                      className=" w-full h-full xl:px-5"
                      alt=""
                    />
              </Link>
            </div>
            <div className="ulcont lg:col-span-2 md:col-span-1 sm:col-span-2 col-span-1 h-full w-full order-2">
              <ul
                ref={containerRef}
                className="flex items-center font-medium ml-4 h-full lg:left-0 mx-auto"
              >
                {visibleCategories.map((category) => (
                  <li
                    key={category._id}
                    className="h-16 w-fit relative after:absolute after:rounded-t-xl after:w-full after:h-1 after:bg-[#4E1B61] after:-bottom-0.5 after:left-0 after:opacity-0 hover:after:opacity-100 after:ease-in-out after:duration-300 after:transition-all"
                  >
                    <Link
                      href={`/${category.categoryName
                        .toLowerCase()
                        .replace(" ", "-")}-${category._id}`}
                      className="px-2 h-full flex justify-center items-center"
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
                          <NavigationMenuTrigger className="h-16 w-max relative after:absolute after:rounded-t-xl after:w-full after:h-1 after:bg-[#4E1B61] after:-bottom-0.5 after:left-0 after:opacity-0 hover:after:opacity-100 after:ease-in-out after:duration-300 after:transition-all">
                            Categories
                          </NavigationMenuTrigger>
                          <NavigationMenuContent className="bg-white grid grid-cols-1 py-2 !border border-[#4e1b6156]">
                            <div className="links col-span-1">
                              {hiddenCategories.map((category) => (
                                <NavigationMenuLink
                                  key={category._id}
                                  href={`/${category.categoryName
                                    .toLowerCase()
                                    .replace(" ", "-")}-${category._id}`}
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
                "search h-full lg:col-span-2 md:col-span-1 col-span-6 md:order-3 order-4 w-full flex justify-center items-center"
              }
            >
              <form className=" flex items-center relative w-full">
                <Input
                  className="h-10 w-full rounded-xl placeholder:text-[#00000091] text-[#4e1b61] bg-transparent font-medium border-[#4e1b6185] pr-12"
                  placeholder="Search...."
                />
                <Button
                  className="w-10 h-10 rounded-r-xl rounded-l-none absolute right-0"
                  size="icon"
                >
                  <SearchIcon className="w-5 h-5" />
                </Button>
              </form>
            </div>
            <ul
              className={`flex items-center justify-end md:col-span-1 col-span-3 md:order-4 order-3`}
            >
              <li
                className={
                  (lastScroll > 104 ? " " : "") +
                  "lg:ml-3 flex justify-center items-center rounded-full border-[#4E1B61] duration-150 ease-in-out transition-all"
                }
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="sm:h-10 sm:w-10 h-8 w-8 grid place-items-center">
                      <Link href="/" className=" sm:p-2.5 p-1 flex relative">
                        <HeartIcon fill="#4E1B61" className="w-5 h-5" />
                        <span
                          className={
                            (lastScroll > 104
                              ? "bg-[#4E1B61] border-[#4E1B61] text-[#fff]"
                              : "bg-white") +
                            " absolute text-xs sm:top-0 -top-2 sm:right-0 -right-1.5 font-medium border rounded-full text-center w-5 h-5 flex justify-center items-center"
                          }
                        >
                          0
                        </span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className=" bg-white">
                      <p className=" text-xs">Wishlist</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
              <li
                className={
                  (lastScroll > 104 ? " " : "") +
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
                        <ShoppingCartIcon fill="#4E1B61" className="w-5 h-5" />
                        <span
                          className={
                            (lastScroll > 104
                              ? "bg-[#4E1B61] border-[#4E1B61] text-[#fff]"
                              : "bg-white") +
                            " absolute text-xs sm:top-0 -top-2 sm:right-0 -right-1.5 font-medium border rounded-full text-center w-5 h-5 flex justify-center items-center"
                          }
                        >
                          0
                        </span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className=" bg-white">
                      <p className=" text-xs">Cart</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
              <li className={"flex justify-center items-center ml-2"}>
                {isAuth ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className={
                        (lastScroll > 104 ? " bg-[#4E1B61] text-white" : "") +
                        " sm:w-10 sm:h-10 h-8 w-8 grid place-items-center border border-[#4E1B61] rounded-full outline-none duration-150 ease-in-out transition-all"
                      }
                    >
                      <User2Icon className=" sm:w-5 sm:h-5 w-3.5 h-3.5  " />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className=" bg-white sm:text-sm text-xs">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        Logout
                      </DropdownMenuItem>
                      {/* <DropdownMenuItem>
                        <Link href="/vendor">Login as Vendor</Link>
                      </DropdownMenuItem> */}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    href="/auth"
                    className={
                      (lastScroll > 104
                        ? "bg-[#4E1B61] text-white "
                        : "bg-transparent ") +
                      "lg:ml-2 text-[#4E1B61] px-5 py-2 rounded sm:text-sm text-xs ease-in-out transition-all duration-150 border border-[#4E1B61] font-medium"
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
