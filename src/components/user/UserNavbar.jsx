"use client";
import Link from "next/link";
import { Input } from "../ui/input";
import {
  HeartIcon,
  MenuIcon,
  Search,
  ShoppingCartIcon,
  User2Icon,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
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

const UserNavbar = () => {
  const [lastScroll, setLastScroll] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const router = useRouter();

  useEffect(() => {
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
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuth") === "true";
    setIsAuth(authStatus);
  }, []);

  const handleLogout = () => {
    logout();
    setIsAuth(false);
    router.push("/");
  };

  return (
    <header className="shadow-[0_0_5px_rgba(78,27,97,0.50)] sticky top-0 z-50">
      <nav>
        <div
          className={
            (lastScroll > 104
              ? "py-2 bg-[#ffffff8b] backdrop-blur"
              : "sm:py-2.5 py-2 bg-white") +
            ` px-[5%] lower text-[#4E1B61] transition-all ease-in-out duration-200`
          }
        >
          <div className="flex items-center justify-between max-w-[100rem] mx-auto">
            <div className="logo font-semibold transition-all ease-in-out duration-200 md:w-52 w-32">
              <Link href="/">
                <img src="/assets/website_logo.png" alt="" />
              </Link>
            </div>
            <div className="right flex items-center justify-center">
              <Search />
              <div className="search lg:block hidden">
                <form>
                  <Input
                    className=" w-80 rounded-full placeholder:text-[#4e1b6191] bg-transparent"
                    placeholder="Search"
                  />
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
                    (lastScroll > 104 ? " bg-[#4E1B61] text-white" : "") +
                    ` ml-3 border flex justify-center items-center rounded-full border-[#4E1B61] duration-150 ease-in-out transition-all`
                  }
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="sm:h-10 sm:w-10 h-8 w-8 grid place-items-center">
                        <Link href="/" className=" sm:p-2.5 p-1">
                          <HeartIcon className="sm:w-5 sm:h-5 w-3.5 h-3.5" />
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
                    (lastScroll > 104 ? " bg-[#4E1B61] text-white" : "") +
                    ` sm:ml-3 ml-1 border flex justify-center items-center rounded-full border-[#4E1B61] duration-150 ease-in-out transition-all`
                  }
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="sm:h-10 sm:w-10 h-8 w-8 grid place-items-center">
                        <Link href="/cart" className=" sm:p-2.5 p-1">
                          <ShoppingCartIcon className="sm:w-5 sm:h-5 w-3.5 h-3.5" />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent className=" bg-white">
                        <p>Cart</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </li>
                <li className={`sm:ml-3 ml-1 flex justify-center items-center`}>
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
                        (lastScroll > 104 ? " bg-[#4E1B61] text-white" : "") +
                        " border border-[#4E1B61] sm:px-5 sm:py-2 px-2.5 py-1.5 rounded md:text-base sm:text-sm text-xs"
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
