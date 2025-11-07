"use client";
import useDeviceTracking from "@/hooks/useDeviceTracking";
import useLocationTracking from "@/hooks/useLocationTracking";
import useUser from "@/hooks/useUser";
import { useStore } from "@/store";
import { ChevronRight, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CartPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const location = useLocationTracking();
  const deviceInfo = useDeviceTracking();
  const cart = useStore((state: any) => state.cart);
  const removeFromCart = useStore((state: any) => state.removeFromCart);
  const [loading, setLoading] = useState(false);
  const [discountedProductId, setDiscountedProductId] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [selectedAddressId, setSelectedAddressId] = useState("");

  const decreaseQuantity = (id: string) => {
    useStore.setState((state: any) => ({
      cart: state.cart.map((item: any) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    }));
  };

  const increaseQuantity = (id: string) => {
    useStore.setState((state: any) => ({
      cart: state.cart.map((item: any) =>
        item.id === id ? { ...item, quantity: (item.quantity ?? 1) + 1 } : item
      ),
    }));
  };

  const removeItem = (id: string) => {
    removeFromCart(id, user, location, deviceInfo);
  };

  const subtotal = cart.reduce((total: number, item: any) => {
    const price =
      item.id === discountedProductId
        ? (item.sale_price * (100 - discountPercent)) / 100
        : item.sale_price;

    return total + item.quantity * price;
  }, 0);

  return (
    <div className="w-full bg-white">
      <div className="md:w-[80%] w-[95%] mx-auto min-h-screen">
        <div className="pb-[50px]">
          <h1 className="md: pt-[50px] font-medium text-[44px]">
            Shopping Cart
          </h1>
          <div className="flex items-center">
            <Link href="/" className="text-[#55585b] font-bold hover:underline">
              Home
            </Link>
            <ChevronRight size={16} className="text-[#55585b]" />
            <span className="text-[#55585b]">Cart</span>
          </div>
        </div>
        {cart.length === 0 ? (
          <div className="text-center text-gray-600 text-lg">
            Your cart is empty! Start adding products.
          </div>
        ) : (
          <div className="lg:flex gap-10 items-start">
            <table className="w-full lg:w-[70%] border-collapse">
              <thead className="bg-[#f1f3f4] rounded">
                <tr>
                  <th className="py-3 text-left align-middle pl-6">Product</th>
                  <th className="py-3 text-left align-middle">Price</th>
                  <th className="py-3 text-left align-middle">Quantity</th>
                  <th className="py-3 text-left align-middle"></th>
                </tr>
              </thead>
              <tbody>
                {cart?.map((item: any) => (
                  <tr key={item.id} className="border-b border-b-[#00000e]">
                    <td className="flex items-center gap-4 p-4">
                      <Image
                        src={item?.images[0]?.url}
                        alt={item.title}
                        width={80}
                        height={80}
                        className="rounded"
                      />
                      <div className="flex flex-col">
                        <span className="font-medium">{item.title}</span>
                        {item?.selectedOptions && (
                          <div className="text-sm text-gray-500">
                            {item?.selectedOptions?.color && (
                              <span>
                                Color:
                                <span
                                  style={{
                                    backgroundColor:
                                      item?.selectedOptions?.color,
                                    width: "12px",
                                    height: "12px",
                                    borderRadius: "100%",
                                    display: "inline-block",
                                  }}
                                />
                              </span>
                            )}
                            {item?.selectedOptions?.size && (
                              <span className="ml-2">
                                Size: {item?.selectedOptions?.size}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 text-lg text-left">
                      {item?.id === discountedProductId ? (
                        <div className="flex flex-col items-center">
                          <span className="line-through text-gray-500 text-sm">
                            ${item.sale_price.toFixed(2)}
                          </span>
                          <span className="text-green-600 font-semibold">
                            $
                            {(
                              (item.sale_price * (100 - discountPercent)) /
                              100
                            ).toFixed(2)}
                          </span>
                          <span className="text-xs text-green-700">
                            Discount Applied
                          </span>
                        </div>
                      ) : (
                        <span>${item.sale_price.toFixed(2)}</span>
                      )}
                    </td>
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
                    <td className="text-center">
                      <button
                        onClick={() => removeItem(item?.id)}
                        className="text-[#818487] cursor-pointer hover:text-[#ff1826] transition duration-200"
                      >
                        x Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-6 shadow-md w-full lg:w-[30%] bg-[#f9f9f9] rounded-lg">
              {discountAmount > 0 && (
                <div className="flex justify-between items-center text-[#010f1c] pb-1 text-base font-medium">
                  <span className="font-jost">
                    Discount({discountPercent}%)
                  </span>
                  <span className="text-green-600">
                    - ${discountAmount.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center text-[#010f1c] text-[20px] font-[550] pb-3">
                <span>Subtotal</span>
                <span>${(subtotal - discountAmount).toFixed(2)}</span>
              </div>
              <hr className="my-4 text-slate-200" />

              <div className="mb-4">
                <h4 className="mb-[7px] font-[500] text-[15px]">
                  Have a Coupon?
                </h4>
                <div className="flex">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e: any) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="w-full p-2 border border-gray-200 rounded-l-md focus:outline-none focus:border-blue-500"
                  />
                  <button
                    className="bg-blue-500 cursor-pointer text-white px-4 rounded-r-md hover:bg-blue-600 transition-all"
                    // onClick={() => couponeCodeapply}
                  >
                    Apply
                  </button>
                  {/* {error && (
                    <p className="text-sm pt-2 text-red-500">{error}</p>
                  )} */}
                </div>
                <hr className="my-4 text-slate-200" />

                <div className="mb-4">
                  <h4 className="mb-[7px] font-medium text-[15px]">
                    Select Shipping Address
                  </h4>
                  <select
                    value={selectedAddressId}
                    className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500"
                    onChange={(e: any) => setSelectedAddressId(e.target.value)}
                  >
                    <option value="123">Home - Ahmedabad - INDIA </option>
                  </select>
                </div>
                <hr className="text-slate-200 my-4" />

                <div className="mb-4">
                  <h4 className="mb-[7px] font-[500] text-[15px]">
                    Select Payment Method
                  </h4>
                  <select
                    value={selectedAddressId}
                    className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:border-blue-500"
                    onChange={(e: any) => setSelectedAddressId(e.target.value)}
                  >
                    <option value="credit_card">Online Payment</option>
                    <option value="cash_on_delivery">Cash on Delivery</option>
                  </select>
                </div>
                <hr className="text-slate-200 my-4" />

                <div className="flex justify-between items-center text-[#010f1c] text-[20px] font-[550] pb-3">
                  <span>Total</span>
                  <span>${(subtotal - discountAmount).toFixed(2)}</span>
                </div>

                <button
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 cursor-pointer mt-4 py-3 bg-[#010f1c] text-white hover:bg-[#0989FF] transition-all rounded-lg"
                >
                  {loading && <Loader2 className="animate-spin w-5 h-5" />}
                  {loading ? "Redirecting..." : "Proceed to Checkout"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
