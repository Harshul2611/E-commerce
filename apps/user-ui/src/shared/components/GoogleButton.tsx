import React from "react";
import { FcGoogle } from "react-icons/fc";

const GoogleButton = () => {
  return (
    <div className="w-fit m-auto mt-2">
      <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-md cursor-pointer">
        <FcGoogle size={32} />
        <div className="font-normal text-black">Sign in with Google</div>
      </div>
    </div>
  );
};

export default GoogleButton;
