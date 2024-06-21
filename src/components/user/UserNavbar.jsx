"use client";
import Link from "next/link";
import { Input } from "../ui/input";
import {
  HeartIcon,
  MenuIcon,
  Search,
  SearchIcon,
  ShoppingCartIcon,
  User2Icon,
  X,
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
import { FaHamburger } from "react-icons/fa";
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

  window.onresize = () => {
    window.innerWidth > 1024 ? setToggle(true) : setToggle(false);
  };

  const handleLogout = () => {
    logout();
    setIsAuth(false);
    router.push("/");
  };

  useEffect(() => {
    // const handleResize = () => {
    //   const width = containerRef.current.offsetWidth;
    //   console.log(width);
    //   const items = Array.from(containerRef.current.children).slice(0, -1);
    //   let totalWidth = 0;
    //   const visible = [];
    //   const hidden = [];
    //   console.log(items.offsetWidth);

    //   items.forEach((items, index) => {
    //     totalWidth += items.offsetWidth;
    //     totalWidth <= width
    //       ? visible.push(data.data[index])
    //       : hidden.push(data.data[index]);
    //   });
    //   setVisibleCategories(visible);
    //   setHiddenCategories(hidden);
    // };
    // handleResize();
    // window.addEventListener("resize", handleResize);

    // return () => {
    //   window.removeEventListener("resize", handleResize);
    // };

    window.addEventListener('resize',()=>{
      console.log(containerRef.current.offsetWidth);
    })
  }, []);

  console.log(data?.data);
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
            (lastScroll > 104 ? "bg-[#ffffff8b] backdrop-blur" : "bg-white") +
            ` px-[5%] lower text-[#4E1B61] transition-all ease-in-out duration-200`
          }
        >
          <div className="flex items-center justify-between max-w-[100rem] mx-auto">
            <div className="left flex items-center">
              <div className="logo font-semibold transition-all ease-in-out duration-200 md:w-44 w-32">
                <Link href="/" className=" w-full">
                  <img src="/assets/website_logo.png" alt="" />
                </Link>
              </div>
              <ul
                ref={containerRef}
                className="flex items-center font-medium ml-4 h-16 bg-red-400 w-fit"
              >
                {data?.data?.map((category) => (
                  <li
                    key={category._id}
                    className="h-16 w-max relative after:absolute after:rounded-t-xl after:w-full after:h-1 after:bg-[#4E1B61] after:-bottom-0.5 after:left-0 after:opacity-0 hover:after:opacity-100 after:ease-in-out after:duration-300 after:transition-all mx-1"
                  >
                    <Link
                      href={category._id}
                      className="px-3 h-full flex justify-center items-center"
                    >
                      {category.categoryName}
                    </Link>
                  </li>
                ))}
                <li className="h-16">
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem className="">
                        <NavigationMenuTrigger className="h-16 w-max relative after:absolute after:rounded-t-xl after:w-full after:h-1 after:bg-[#4E1B61] after:-bottom-0.5 after:left-0 after:opacity-0 hover:after:opacity-100 after:ease-in-out after:duration-300 after:transition-all">
                          Categories
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="bg-white">
                          {hiddenCategories.map((category) => (
                            <NavigationMenuLink
                              key={category._id}
                              href={`/${category._id}`}
                            >
                              {category.categoryName}
                            </NavigationMenuLink>
                          ))}
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </li>
              </ul>
            </div>
            <div className="right flex items-center justify-center">
              {/* <button
                onClick={() => {
                  setToggle(!toggle);
                  console.log(toggle);
                }}
                className={
                  (lastScroll > 104 ? "bg-[#4E1B61] text-white " : "") +
                  `ml-3 border rounded-full border-[#4E1B61] duration-150 ease-in-out transition-all sm:h-11 sm:w-11 h-[33px] w-[33px] grid place-items-center lg:hidden`
                }
              >
                <p className=" sm:p-2.5 p-1">
                  <Search className="sm:w-5 sm:h-5 w-3.5 h-3.5" />
                </p>
              </button> */}
              <div
                className={
                  (lastScroll > 104 ? "" : "") +
                  " search lg:block flex justify-center items-center lg:relative absolute lg:top-0 md:top-[90%] sm:top-[88%] top-[85%] lg:right-0 lg:w-max md:w-72 sm:w-64 w-56 lg:h-auto sm:h-16 h-12"
                }
              >
                <form className=" flex items-center relative">
                  <Input
                    className=" lg:w-[25rem] md:w-64 sm:w-56 w-52 h-10 rounded-xl placeholder:text-[#4e1b6191] bg-transparent font-normal border-[#4e1b6185]"
                    placeholder="Search"
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
                className={
                  // (windowWidth <= 768
                  //   ? (toggle ? `-left-0` : `-left-full`) +
                  //     ` flex-col absolute top-0 left-0 w-full h-screen bg-red-300 transition-all ease-in-out duration-500`
                  //   : ` flex-row`) +
                  ` flex items-center justify-center`
                }
              >
                <li
                  className={
                    (lastScroll > 104 ? " " : "") +
                    `ml-3 flex justify-center items-center rounded-full border-[#4E1B61] duration-150 ease-in-out transition-all`
                  }
                  // border bg-[#4E1B61] text-white
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="sm:h-10 sm:w-10 h-8 w-8 grid place-items-center">
                        <Link href="/" className=" sm:p-2.5 p-1 flex relative">
                          <HeartIcon
                            fill="#4E1B61"
                            className="sm:w-5 sm:h-5 w-3.5 h-3.5"
                          />
                          <span className="absolute text-xs top-0 right-0 bg-white font-medium border rounded-full text-center w-5 h-5 flex justify-center items-center">
                            0
                          </span>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent className=" bg-white">
                        <p>Wishlist</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </li>
                <li
                  className={
                    (lastScroll > 104 ? " " : "") +
                    `  ml-0.5 flex justify-center items-center rounded-full border-[#4E1B61] duration-150 ease-in-out transition-all`
                  }
                  // border bg-[#4E1B61] text-white
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
                            className="sm:w-5 sm:h-5 w-3.5 h-3.5"
                          />
                          <span className="absolute text-xs top-0 right-0 bg-white font-medium border rounded-full text-center w-5 h-5 flex justify-center items-center">
                            0
                          </span>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent className=" bg-white">
                        <p>Cart</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </li>
                <li className={` ml-1 flex justify-center items-center`}>
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
                        "ml-2 text-[#4E1B61] sm:px-5 sm:py-2 px-2.5 rounded sm:text-sm text-xs ease-in-out transition-all duration-150 border border-[#4E1B61] font-medium"
                      }
                    >
                      Login
                    </Link>
                  )}
                </li>
              </ul>
              {/* <Button
                onClick={() => {
                  setToggle(!toggle);
                }}
                variant="ghost"
                className="toggle relative grid place-items-center text-black hover:bg-white hover:text-black hover:border-0 border-0 md:hidden"
              >
                <MenuIcon
                  className={(toggle ? "hidden" : "block") + ` absolute`}
                />
                <X className={(toggle ? "block" : "hidden") + ` absolute`} />
              </Button> */}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default UserNavbar;
