"use client";
import useDeviceTracking from "@/hooks/useDeviceTracking";
import useLocationTracking from "@/hooks/useLocationTracking";
import useUser from "@/hooks/useUser";
import { useStore } from "@/store";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const WishlistPage = () => {
  const { user } = useUser();
  const location = useLocationTracking();
  const deviceInfo = useDeviceTracking();
  const addToCart = useStore((state: any) => state.addToCart);
  const removeFromWishlist = useStore((state: any) => state.removeFromWishlist);
  const wishlist = useStore((state: any) => state.wishlist);

  const decreaseQuantity = (id: string) => {
    useStore.setState((state: any) => ({
      wishlist: state.wishlist.map((item: any) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    }));
  };

  const increaseQuantity = (id: string) => {
    useStore.setState((state: any) => ({
      wishlist: state.wishlist.map((item: any) =>
        item.id === id ? { ...item, quantity: (item.quantity ?? 1) + 1 } : item
      ),
    }));
  };

  const removeItem = (id: string) => {
    removeFromWishlist(id, user, location, deviceInfo);
  };

  return (
    <div className="w-full bg-white">
      <div className="md:w-[80%] w-[95%] mx-auto min-h-screen">
        <div className="pb-[50px]">
          <h1 className="md: pt-[50px] font-medium text-[44px]">Wishlist</h1>
          <div className="flex items-center">
            <Link href="/" className="text-[#55585b] font-bold hover:underline">
              Home
            </Link>
            <ChevronRight size={16} className="text-[#55585b]" />
            <span className="text-[#55585b]">wishlist</span>
          </div>
        </div>
        {wishlist?.length === 0 ? (
          <div className="text-center text-gray-600 text-lg">
            Your wishlist is empty! Start adding products
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <table className="w-full border-collapse">
              <thead className="bg-[#f1f3f4]">
                <tr>
                  <th className="py-3 text-left pl-4">Product</th>
                  <th className="py-3 text-left">Price</th>
                  <th className="py-3 text-left">Quantity</th>
                  <th className="py-3 text-left">Action</th>
                  <th className="py-3 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {wishlist?.map((item: any) => (
                  <tr key={item.id} className="border-b border-b-[#00000e]">
                    <td className="flex items-center gap-3 p-4">
                      <Image
                        src={item?.images[0]?.url}
                        alt={item?.title}
                        width={80}
                        height={80}
                        className="rounded"
                      />
                      <span>{item?.title}</span>
                    </td>
                    <td className="text-lg">${item?.sale_price.toFixed(2)}</td>
                    <td>
                      <div className="flex justify-center items-center border border-gray-200 rounded-[20px] w-[90px] p-[2px]">
                        <button
                          className="text-black cursor-pointer text-xl"
                          onClick={() => decreaseQuantity(item.id)}
                        >
                          -
                        </button>
                        <span className="px-4">{item?.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item?.id)}
                          className="text-black cursor-pointer text-xl"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          addToCart(item, user, location, deviceInfo)
                        }
                        className="bg-[#2295FF] cursor-pointer text-white py-2 px-5 rounded-md hover:bg-[#007bff] transition-all"
                      >
                        Add to Cart
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[#818487] cursor-pointer hover:text-[#ff1826] transition duration-200"
                      >
                        x Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
