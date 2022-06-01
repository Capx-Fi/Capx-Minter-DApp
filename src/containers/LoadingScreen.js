import React from "react";
import CapxLogo from "../assets/capx-mint-logo.svg";

function LoadingScreen() {
	return (
    <div className="align-middle justify-center justify-items-center bg-dark-400 flex h-screen">
      <div className="animate-pulse text-white text-5xl text-bold phone:w-55v screen:w-auto align-middle justify-center m-auto">
        <img
          alt="logo"
          src={CapxLogo}
          className="animate-pulse w-15v align-middle justify-center m-auto "
        />
      </div>
    </div>
  );
}

export default LoadingScreen;
