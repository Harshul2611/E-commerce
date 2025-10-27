import axiosInstance from "../axiosInstance";

type RegistrationParams = {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  country: string;
};

type VerifyParams = {
  data: RegistrationParams;
  otp: string;
};

type CreateShopParams = {
  name: string;
  bio: string;
  address: string;
  opening_hours?: string;
  website?: string;
  category: string;
  sellerId: string;
};

type SellerLogIn = {
  email: string;
  password: string;
};

export const sellerRegistration = async (data: RegistrationParams) => {
  const response = await axiosInstance.post("/api/seller-registration", data);
  return response.data;
};

export const verifySeller = async ({ data, otp }: VerifyParams) => {
  const response = await axiosInstance.post("/api/verify-seller", {
    ...data,
    otp,
  });
  return response.data;
};

export const createShop = async (data: CreateShopParams) => {
  const response = await axiosInstance.post("/api/create-shop", data);
  return response.data;
};

export const sellerLogin = async (data: SellerLogIn) => {
  const response = await axiosInstance.post("/api/login-seller", data);
  return response.data;
};
