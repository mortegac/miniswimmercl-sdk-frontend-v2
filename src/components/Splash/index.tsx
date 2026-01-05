import React from "react";
import LoadingIcon from "@/components/Base/LoadingIcon";
import {Logo_animate} from "./Logo_animate";

const Splash: React.FC = () => {
  return (
    <div className="bg-primary w-full h-screen flex flex-col justify-center items-center ">
      <Logo_animate />
      <LoadingIcon
        icon="bars"
        color="#ffffff"
        className="-mt-16 ml-48 w-24 h-24"
      />
      <p className="text-2xl  text-slate-700 px-10 py-3 rounded-2xl bg-white/30 mt-6">
        versión: {__APP_VERSION__}
      </p>
    </div>
  );
};

export default Splash;
