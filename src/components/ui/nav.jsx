"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSelectedLayoutSegment } from "next/navigation";
import { logout } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Nav({ links, isCollapsed }) {
  const segment = useSelectedLayoutSegment();
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();

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
    <TooltipProvider>
      <div
        data-collapsed={isCollapsed}
        className="group flex flex-col justify-between gap-4 py-6 data-[collapsed=true]:py-6"
      >
        <nav className="grid gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {links.map((link, index) =>
            isCollapsed ? (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    onClick={() => {
                      link.title === "Logout" ? handleLogout() : "";
                    }}
                    className={cn(
                      buttonVariants({ variant: link.variant, size: "icon" }),
                      "h-10 w-10",
                      link.variant === "dashdefault" &&
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white text-white"
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    <span className="sr-only">{link.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4 bg-white"
                >
                  {link.title}
                  {link.label && <span className="ml-auto">{link.label}</span>}
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link
                key={index}
                onClick={() => {
                  link.title === "Logout" ? handleLogout() : "";
                }}
                href={link.href}
                className={cn(
                  buttonVariants({ variant: link.variant, size: "lg" }),
                  link.variant === "dashdefault" &&
                    "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                  "justify-start"
                )}
              >
                <link.icon className="mr-2 h-4 w-4" />
                {link.title}
                {link.label && (
                  <span
                    className={cn(
                      "ml-auto",
                      link.variant === "dashdefault" &&
                        "text-background dark:text-white"
                    )}
                  >
                    {link.label}
                  </span>
                )}
              </Link>
            )
          )}
        </nav>
        {/* <div className="help mx-auto text-center">
        <h1 className=" font-medium mb-2">Customer Support</h1>
        <p className=" text-[#777] text-sm w-44 mb-2">
          Ask you query , place requests or important issues. Our support team
          will contact 24/7 to you.
        </p>
       <Button> Connect Now</Button>
      </div> */}
      </div>
    </TooltipProvider>
  );
}
