import Link from "next/link";
import React from "react";
import { HeartIcon, Search, ShoppingBag, User } from "lucide-react";
import HeaderBottom from "./Header-bottom";

const Header = () => {
  return (
    <div className="w-full bg-white">
      <div className="w-[80%] py-5 m-auto flex items-center justify-between">
        <div>
          <Link href="/">
            <span className="text-xl font-semibold">Ecommerce</span>
          </Link>
        </div>
        <div className="w-[50%] relative">
          <input
            type="text"
            className="w-full px-4 font-Poppins font-medium border-[2.5px] border-[#3489FF] outline-none h-[45px] rounded-md"
            placeholder="Search for products..."
          />
          <div className="absolute flex justify-center items-center top-0 right-0 w-[60px] h-[45px] bg-[#3489FF]">
            <Search className="text-white font-bold" />
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="flex items-center cursor-pointer rounded-full border-gray-300 border-2 w-[50px] h-[50px] justify-center"
            >
              <User />
            </Link>
            <Link href="/login" className="flex items-center flex-col">
              <div className="block font-medium">Hello,</div>
              <div className="font-semibold">Sign In</div>
            </Link>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/wishlist" className="relative">
              <HeartIcon />
              <div className="w-6 h-6 rounded-full flex items-center justify-center bg-red-500 absolute border-white top-[-10px] right-[-10px]">
                <span className="text-white font-medium text-xs">0</span>
              </div>
            </Link>
            <Link href="/cart" className="relative">
              <ShoppingBag />
              <div className="absolute w-6 h-6 bg-red-500 rounded-full top-[-10px] right-[-10px] border-white flex items-center justify-center">
                <span className="text-white font-medium text-xs">0</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="border-b border-b-[#99999938]" />
      <HeaderBottom />
    </div>
  );
};

export default Header;
