import { axiosInstance } from "../axiosInstance";

type FormData = {
  name: string;
  email: string;
  password: string;
};

type VerifyOtpParams = {
  data: FormData;
  otp: string;
};

type UserLoginParams = {
  email: string;
  password: string;
};

export const UserRegistration = async (data: FormData) => {
  const response = await axiosInstance.post("/api/user-registration", data);
  return response.data;
};

export const UserVerfiyOtp = async ({ data, otp }: VerifyOtpParams) => {
  const response = await axiosInstance.post("/api/verify-user", {
    ...data,
    otp,
  });
  return response.data;
};

export const UserLogin = async (data: UserLoginParams) => {
  const response = await axiosInstance.post("/api/login", data);
  return response.data;
};

export const UserForgotPassword = async ({ email }: { email: string }) => {
  const response = await axiosInstance.post("/api/forgot-password-user", {
    email,
  });
  return response.data;
};

export const UserVerifyOtp = async ({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) => {
  const response = await axiosInstance.post(
    "/api/verify-forgot-password-user",
    { email, otp }
  );
  return response.data;
};

export const UserResetPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await axiosInstance.post("/api/reset-password-user", {
    email,
    password,
  });
  return response.data;
};
