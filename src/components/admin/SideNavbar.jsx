"use client";

import { useEffect, useState } from "react";
import { Nav } from "../ui/nav";
import {
  BoxSelect,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Gift,
  LayoutDashboard,
  LogOutIcon,
  LucideShoppingBag,
  Settings,
  User2Icon,
} from "lucide-react";

function SideNavbar({}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [width, setWidth] = useState(window.innerWidth > 786);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth > 786);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div
      className={
        (width && isCollapsed
          ? `min-w-[80px]`
          : width
          ? `min-w-[250px]`
          : `w-[80px] `) +
        ` border-r-2 border-[#4e1b6134] px-1 py-20 sticky top-0 min-h-screen`
      }
    >
      {width && (
        <button
          className={`grid place-items-center w-10 h-10 border-2 rounded-full border-[#4e1b6157] absolute -right-5 top-8 bg-white`}
          onClick={() => {
            setIsCollapsed(!isCollapsed);
          }}
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      )}
      <Nav
        isCollapsed={width ? isCollapsed : true}
        links={[
          {
            title: "Dashboard",
            href: "/admin",
            icon: LayoutDashboard,
            variant: "dashdefault",
            segment:"admin",
          },
          {
            title: "Users",
            href: "/admin/users",
            icon: User2Icon,
            variant: "ghost",
            segment:"users",
          },
          {
            title: "Vendors",
            href: "/admin/vendor",
            icon: LucideShoppingBag,
            variant: "ghost",
            segment:"vendor",
          },
          {
            title: "Revenue",
            href: "/admin/revenue",
            icon: DollarSign,
            variant: "ghost",
            segment:"revenue",
          },
          {
            title: "Business Category",
            href: "/admin/business-category",
            icon: BoxSelect,
            variant: "ghost",
            segment:"business-category",
          },
          {
            title: "Product Category",
            href: "/admin/product-category",
            icon: Gift,
            variant: "ghost",
            segment:"product-category"
          },
          {
            title: "Settings",
            href: "/",
            icon: Settings,
            variant: "ghost",
            segment: null
          },
          {
            title: "Logout",
            href: "/",
            icon: LogOutIcon,
            variant: "ghost",
            segment: null
          },
        ]}
      />
    </div>
  );
}
export default SideNavbar;



