"use client";
import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  HeartIcon,
  ShoppingBag,
  TextAlignStart,
  User,
} from "lucide-react";
import { navItems, NavItemsTypes } from "@/configs/Constants";
import Link from "next/link";
import useUser from "@/hooks/useUser";
import { useStore } from "@/store";

const HeaderBottom = () => {
  const [show, setShow] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const wishlist = useStore((state: any) => state.wishlist);
  const cart = useStore((state: any) => state.cart);
  const { user, isLoading } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`w-full transition-all duration-300 ${
        isSticky
          ? "fixed top-0 left-0 z-[100] bg-white shadow-lg pb-3"
          : "relative"
      }`}
    >
      <div
        className={`w-[80%] relative m-auto flex items-center justify-between ${
          isSticky ? "pt-3" : "py-0"
        }`}
      >
        {/* All dropdown menus */}
        <div
          className={`w-[260px] ${
            isSticky && "-mb-2"
          } cursor-pointer flex items-center justify-between px-5 h-[50px] bg-[#3489ff]`}
          onClick={() => setShow(!show)}
        >
          <div className="flex items-center gap-2">
            <TextAlignStart color="white" />
            <span className="text-white font-medium">All Departments</span>
          </div>
          <ChevronDown color="white" />
        </div>

        {/* Dropdown menu */}
        {show && (
          <div
            className={`absolute left-0 ${
              isSticky ? "top-[70px]" : "top-[50px]"
            } w-[260px] h-[400px] bg-[#f5f5f5]`}
          ></div>
        )}

        {/* Navigation Links */}
        <div className="flex items-center">
          {navItems.map((item: NavItemsTypes, index: number) => (
            <Link
              key={index}
              href={item.href}
              className="px-5 font-medium text-lg"
            >
              {item.title}
            </Link>
          ))}
        </div>
        <div>
          {isSticky && (
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                {!isLoading && user ? (
                  <>
                    <Link
                      href="/profile"
                      className="flex items-center cursor-pointer rounded-full border-gray-300 border-2 w-[50px] h-[50px] justify-center"
                    >
                      <User />
                    </Link>
                    <Link
                      href="/profile"
                      className="flex items-center flex-col"
                    >
                      <div className="block font-medium">Hello,</div>
                      <div className="font-semibold">
                        {user?.name?.split(" ")[0]}
                      </div>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="flex items-center cursor-pointer rounded-full border-gray-300 border-2 w-[50px] h-[50px] justify-center"
                    >
                      <User />
                    </Link>
                    <Link href="/login" className="flex items-center flex-col">
                      <div className="block font-medium">Hello,</div>
                      <div className="font-semibold">
                        {isLoading ? "..." : "Sign In"}
                      </div>
                    </Link>
                  </>
                )}
              </div>
              <div className="flex items-center gap-5">
                <Link href="/wishlist" className="relative">
                  <HeartIcon />
                  <div className="w-6 h-6 rounded-full flex items-center justify-center bg-red-500 absolute border-white top-[-10px] right-[-10px]">
                    <span className="text-white font-medium text-xs">
                      {wishlist?.length}
                    </span>
                  </div>
                </Link>
                <Link href="/cart" className="relative">
                  <ShoppingBag />
                  <div className="absolute w-6 h-6 bg-red-500 rounded-full top-[-10px] right-[-10px] border-white flex items-center justify-center">
                    <span className="text-white font-medium text-xs">
                      {cart?.length}
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderBottom;
